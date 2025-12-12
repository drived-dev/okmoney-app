#!/bin/bash

# Alternative script using Android NDK's readelf
# This is more reliable if you have Android NDK installed
# Usage: ./check-16kb-libs-ndk.sh [path-to-apk-or-aab] [ndk-path]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Page size in bytes (16 KB = 16384 bytes)
PAGE_SIZE=16384

echo "=========================================="
echo "16 KB Page Size Library Checker (NDK)"
echo "=========================================="
echo ""

# Check if file path is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <path-to-apk-or-aab> [ndk-path]${NC}"
    echo ""
    echo "Example:"
    echo "  $0 app-release.aab"
    echo "  $0 app-release.aab ~/Library/Android/sdk/ndk/26.1.10909125"
    exit 1
fi

FILE_PATH="$1"
NDK_PATH="$2"

# Try to find NDK if not provided
if [ -z "$NDK_PATH" ]; then
    # Common NDK locations
    if [ -d "$HOME/Library/Android/sdk/ndk" ]; then
        # Find the latest NDK version
        LATEST_NDK=$(ls -t "$HOME/Library/Android/sdk/ndk" | head -1)
        NDK_PATH="$HOME/Library/Android/sdk/ndk/$LATEST_NDK"
    elif [ -d "$HOME/Android/Sdk/ndk" ]; then
        LATEST_NDK=$(ls -t "$HOME/Android/Sdk/ndk" | head -1)
        NDK_PATH="$HOME/Android/Sdk/ndk/$LATEST_NDK"
    elif [ -n "$ANDROID_NDK_HOME" ]; then
        NDK_PATH="$ANDROID_NDK_HOME"
    fi
fi

# Find readelf in NDK
if [ -n "$NDK_PATH" ] && [ -d "$NDK_PATH" ]; then
    # Try different architectures
    for arch in aarch64 arm x86_64 x86; do
        READELF="$NDK_PATH/toolchains/llvm/prebuilt/darwin-x86_64/bin/llvm-readelf"
        if [ ! -f "$READELF" ]; then
            READELF="$NDK_PATH/toolchains/llvm/prebuilt/linux-x86_64/bin/llvm-readelf"
        fi
        if [ -f "$READELF" ]; then
            break
        fi
    done
else
    READELF="readelf"
fi

if ! command -v "$READELF" &> /dev/null && [ ! -f "$READELF" ]; then
    echo -e "${YELLOW}Warning: Could not find readelf. Using system readelf...${NC}"
    READELF="readelf"
fi

echo -e "${BLUE}Using: $READELF${NC}"
echo ""

# Check if file exists
if [ ! -f "$FILE_PATH" ]; then
    echo -e "${RED}Error: File not found: $FILE_PATH${NC}"
    exit 1
fi

# Extract file
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
    # Extract APK
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
SO_FILES=$(find "$EXTRACT_DIR" -name "*.so" -type f)

if [ -z "$SO_FILES" ]; then
    echo -e "${YELLOW}No native libraries found${NC}"
    rm -rf "$EXTRACT_DIR"
    [ "$CLEANUP_TEMP" -eq 1 ] && rm -rf "$TEMP_DIR"
    exit 0
fi

TOTAL_LIBS=$(echo "$SO_FILES" | wc -l | tr -d ' ')
echo "Found $TOTAL_LIBS native library(ies)"
echo ""
echo "Checking alignment..."
echo "=========================================="

FAILED_LIBS=()
PASSED_LIBS=()

for SO_FILE in $SO_FILES; do
    REL_PATH="${SO_FILE#$EXTRACT_DIR/}"
    ARCH=$(echo "$REL_PATH" | sed -n 's|.*lib/\([^/]*\)/.*|\1|p')
    [ -z "$ARCH" ] && ARCH="unknown"
    LIB_NAME=$(basename "$SO_FILE")
    
    # Check using readelf -l (program headers)
    # Look for LOAD segments and check their alignment
    ALIGNMENT_INFO=$("$READELF" -l "$SO_FILE" 2>/dev/null || echo "")
    
    if [ -z "$ALIGNMENT_INFO" ]; then
        echo -e "${YELLOW}⚠  $REL_PATH${NC} (Could not read)"
        continue
    fi
    
    # Extract alignment values from LOAD segments
    # Format from readelf -l:
    # LOAD           0x000000 0x0000000000000000 0x0000000000000000 0x09b838 0x09b838 R   0x1000
    # The last column (after flags) is the alignment value in hex
    
    # Get all LOAD segment lines
    LOAD_LINES=$(echo "$ALIGNMENT_INFO" | grep "LOAD")
    
    PASSED=true
    MAX_ALIGNMENT=0
    
    # Parse each LOAD segment line
    while IFS= read -r line; do
        # Get the last field which should be the alignment
        ALIGN_STR=$(echo "$line" | awk '{print $NF}')
        
        # Convert hex to decimal
        if [[ "$ALIGN_STR" == 0x* ]]; then
            ALIGN_DEC=$((ALIGN_STR))
        elif [[ "$ALIGN_STR" =~ ^[0-9]+$ ]]; then
            ALIGN_DEC=$ALIGN_STR
        else
            continue
        fi
        
        if [ "$ALIGN_DEC" -gt "$MAX_ALIGNMENT" ]; then
            MAX_ALIGNMENT=$ALIGN_DEC
        fi
        
        if [ "$ALIGN_DEC" -lt "$PAGE_SIZE" ] && [ "$ALIGN_DEC" -gt 0 ]; then
            PASSED=false
        fi
    done <<< "$LOAD_LINES"
    
    # If no alignment found, try to get from Align column
    if [ "$MAX_ALIGNMENT" -eq 0 ]; then
        # Some readelf versions show "Align" in a separate line
        ALIGN_VALUES=$(echo "$ALIGNMENT_INFO" | grep -i "align" | grep -oE "0x[0-9a-f]+|[0-9]+" | head -1)
        if [ -n "$ALIGN_VALUES" ]; then
            if [[ "$ALIGN_VALUES" == 0x* ]]; then
                MAX_ALIGNMENT=$((ALIGN_VALUES))
            else
                MAX_ALIGNMENT=$ALIGN_VALUES
            fi
            if [ "$MAX_ALIGNMENT" -lt "$PAGE_SIZE" ]; then
                PASSED=false
            fi
        fi
    fi
    
    # Final fallback: if still 0, assume 4KB (most common)
    if [ "$MAX_ALIGNMENT" -eq 0 ]; then
        MAX_ALIGNMENT=4096
        PASSED=false
    fi
    
    if [ "$PASSED" = true ] || [ "$MAX_ALIGNMENT" -ge "$PAGE_SIZE" ]; then
        PASSED_LIBS+=("$REL_PATH")
        echo -e "${GREEN}✓  $REL_PATH${NC}"
        echo "   Architecture: $ARCH"
        echo "   Alignment: $MAX_ALIGNMENT bytes"
        echo "   Status: PASSED"
    else
        FAILED_LIBS+=("$REL_PATH")
        echo -e "${RED}✗  $REL_PATH${NC}"
        echo "   Architecture: $ARCH"
        echo "   Alignment: $MAX_ALIGNMENT bytes (needs $PAGE_SIZE)"
        echo "   Status: FAILED"
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
echo ""

if [ ${#FAILED_LIBS[@]} -gt 0 ]; then
    echo -e "${RED}FAILED LIBRARIES:${NC}"
    for lib in "${FAILED_LIBS[@]}"; do
        echo "  - $lib"
    done
    echo ""
    echo -e "${YELLOW}Next Steps:${NC}"
    echo "1. Check which dependencies include these libraries"
    echo "2. Update to newer versions that support 16 KB"
    echo "3. Check if libraries can be rebuilt with proper alignment"
    exit 1
else
    echo -e "${GREEN}✓ All libraries support 16 KB page sizes!${NC}"
    exit 0
fi

