#!/bin/bash

# Script to check which native libraries (.so files) don't support 16 KB page sizes
# Usage: ./check-16kb-libs.sh [path-to-apk-or-aab]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Page size in bytes (16 KB = 16384 bytes)
PAGE_SIZE=16384

echo "=========================================="
echo "16 KB Page Size Library Checker"
echo "=========================================="
echo ""

# Check if file path is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <path-to-apk-or-aab>${NC}"
    echo ""
    echo "Example:"
    echo "  $0 app-release.aab"
    echo "  $0 app-release.apk"
    echo "  $0 android/app/build/outputs/bundle/release/app-release.aab"
    exit 1
fi

FILE_PATH="$1"

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
    echo -e "${RED}Error: File not found: $FILE_PATH${NC}"
    exit 1
fi

# Check if it's APK or AAB
if [[ "$FILE_PATH" == *.aab ]]; then
    echo "Detected AAB file. Extracting..."
    # Extract AAB (it's a zip file with split APK structure)
    EXTRACT_DIR=$(mktemp -d)
    unzip -q "$FILE_PATH" -d "$EXTRACT_DIR" 2>/dev/null || {
        echo -e "${RED}Error: Failed to extract AAB file${NC}"
        rm -rf "$EXTRACT_DIR"
        exit 1
    }
    
    # AAB files have native libraries directly in base/lib/ directory
    # No need to extract base.apk
    if [ ! -d "$EXTRACT_DIR/base/lib" ]; then
        echo -e "${YELLOW}Warning: No base/lib directory found. Checking for alternative structure...${NC}"
        # Some AAB files might have different structure
        if [ -d "$EXTRACT_DIR/base" ]; then
            echo "Found base directory, continuing..."
        else
            echo -e "${RED}Error: Could not find base directory in AAB${NC}"
            rm -rf "$EXTRACT_DIR"
            exit 1
        fi
    fi
    CLEANUP_TEMP=0
elif [[ "$FILE_PATH" == *.apk ]]; then
    # Extract APK to temp directory
    echo "Extracting APK..."
    EXTRACT_DIR=$(mktemp -d)
    unzip -q "$FILE_PATH" -d "$EXTRACT_DIR" 2>/dev/null || {
        echo -e "${RED}Error: Failed to extract APK${NC}"
        rm -rf "$EXTRACT_DIR"
        exit 1
    }
    CLEANUP_TEMP=0
else
    echo -e "${RED}Error: File must be .apk or .aab${NC}"
    exit 1
fi

# Find all .so files
echo "Scanning for native libraries..."
SO_FILES=$(find "$EXTRACT_DIR" -name "*.so" -type f)

if [ -z "$SO_FILES" ]; then
    echo -e "${YELLOW}No native libraries found in APK${NC}"
    rm -rf "$EXTRACT_DIR"
    [ "$CLEANUP_TEMP" -eq 1 ] && rm -rf "$TEMP_DIR"
    exit 0
fi

# Check if readelf is available
if ! command -v readelf &> /dev/null; then
    echo -e "${RED}Error: readelf command not found${NC}"
    echo "Please install binutils:"
    echo "  macOS: brew install binutils"
    echo "  Linux: sudo apt-get install binutils"
    echo "  Or use Android NDK's readelf"
    rm -rf "$EXTRACT_DIR"
    [ "$CLEANUP_TEMP" -eq 1 ] && rm -rf "$TEMP_DIR"
    exit 1
fi

# Count total libraries
TOTAL_LIBS=$(echo "$SO_FILES" | wc -l | tr -d ' ')
echo "Found $TOTAL_LIBS native library(ies)"
echo ""
echo "Checking alignment..."
echo "=========================================="

FAILED_LIBS=()
PASSED_LIBS=()
UNKNOWN_LIBS=()

for SO_FILE in $SO_FILES; do
    # Get relative path from extract dir
    REL_PATH="${SO_FILE#$EXTRACT_DIR/}"
    
    # Get architecture from path (e.g., lib/arm64-v8a/libxxx.so -> arm64-v8a)
    ARCH=$(echo "$REL_PATH" | sed -n 's|.*lib/\([^/]*\)/.*|\1|p')
    if [ -z "$ARCH" ]; then
        ARCH="unknown"
    fi
    
    # Extract library name
    LIB_NAME=$(basename "$SO_FILE")
    
    # Check alignment using readelf
    # Get the LOAD segment alignment
    ALIGNMENT=$(readelf -l "$SO_FILE" 2>/dev/null | grep -A 1 "LOAD" | grep "Align" | head -1 | awk '{print $NF}' || echo "")
    
    if [ -z "$ALIGNMENT" ]; then
        # Try alternative method: check file offset alignment
        # Get the first LOAD segment's file offset
        FILE_OFFSET=$(readelf -l "$SO_FILE" 2>/dev/null | grep -A 1 "LOAD" | grep -oP "0x[0-9a-f]+" | head -1 || echo "")
        
        if [ -n "$FILE_OFFSET" ]; then
            # Convert hex to decimal
            OFFSET_DEC=$((FILE_OFFSET))
            # Check if offset is aligned to 16 KB
            if [ $((OFFSET_DEC % PAGE_SIZE)) -eq 0 ]; then
                ALIGNMENT="OK"
            else
                ALIGNMENT="FAIL"
            fi
        else
            UNKNOWN_LIBS+=("$REL_PATH ($ARCH)")
            echo -e "${YELLOW}⚠  $REL_PATH${NC}"
            echo "   Architecture: $ARCH"
            echo "   Status: Could not determine alignment"
            continue
        fi
    fi
    
    # Check if alignment is 16 KB or more
    if [[ "$ALIGNMENT" == "OK" ]] || [[ "$ALIGNMENT" == "FAIL" ]]; then
        if [[ "$ALIGNMENT" == "OK" ]]; then
            PASSED_LIBS+=("$REL_PATH")
            echo -e "${GREEN}✓  $REL_PATH${NC}"
            echo "   Architecture: $ARCH"
            echo "   Status: PASSED (16 KB aligned)"
        else
            FAILED_LIBS+=("$REL_PATH")
            echo -e "${RED}✗  $REL_PATH${NC}"
            echo "   Architecture: $ARCH"
            echo "   Status: FAILED (not 16 KB aligned)"
        fi
    else
        # Try to parse numeric alignment
        ALIGNMENT_NUM=$(echo "$ALIGNMENT" | grep -oE '[0-9]+' | head -1)
        if [ -n "$ALIGNMENT_NUM" ] && [ "$ALIGNMENT_NUM" -ge "$PAGE_SIZE" ]; then
            PASSED_LIBS+=("$REL_PATH")
            echo -e "${GREEN}✓  $REL_PATH${NC}"
            echo "   Architecture: $ARCH"
            echo "   Alignment: $ALIGNMENT bytes"
            echo "   Status: PASSED"
        else
            FAILED_LIBS+=("$REL_PATH")
            echo -e "${RED}✗  $REL_PATH${NC}"
            echo "   Architecture: $ARCH"
            echo "   Alignment: $ALIGNMENT bytes (needs $PAGE_SIZE)"
            echo "   Status: FAILED"
        fi
    fi
    echo ""
done

# Cleanup
rm -rf "$EXTRACT_DIR"

# Summary
echo "=========================================="
echo "SUMMARY"
echo "=========================================="
echo "Total libraries: $TOTAL_LIBS"
echo -e "${GREEN}Passed: ${#PASSED_LIBS[@]}${NC}"
echo -e "${RED}Failed: ${#FAILED_LIBS[@]}${NC}"
echo -e "${YELLOW}Unknown: ${#UNKNOWN_LIBS[@]}${NC}"
echo ""

if [ ${#FAILED_LIBS[@]} -gt 0 ]; then
    echo -e "${RED}FAILED LIBRARIES:${NC}"
    for lib in "${FAILED_LIBS[@]}"; do
        echo "  - $lib"
    done
    echo ""
    echo -e "${YELLOW}Recommendations:${NC}"
    echo "1. Update the library to a version that supports 16 KB page sizes"
    echo "2. Rebuild the library with 16 KB alignment"
    echo "3. Contact the library maintainer for 16 KB support"
    echo "4. Consider using an alternative library"
    exit 1
else
    echo -e "${GREEN}All libraries support 16 KB page sizes!${NC}"
    exit 0
fi

