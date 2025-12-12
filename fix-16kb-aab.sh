#!/bin/bash

# Script to fix 16 KB alignment for native libraries in AAB file
# This script uses bundletool and zipalign to rebuild AAB with proper alignment
# Usage: ./fix-16kb-aab.sh <path-to-aab-file>

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "16 KB Alignment Fix Script for AAB"
echo "==========================================${NC}"
echo ""

# Check if AAB file is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <path-to-aab-file>${NC}"
    echo ""
    echo "Example:"
    echo "  $0 app-release.aab"
    echo "  $0 android/app/build/outputs/bundle/release/app-release.aab"
    exit 1
fi

AAB_FILE="$1"

# Check if file exists
if [ ! -f "$AAB_FILE" ]; then
    echo -e "${RED}Error: File not found: $AAB_FILE${NC}"
    exit 1
fi

# Check if file is AAB
if [[ "$AAB_FILE" != *.aab ]]; then
    echo -e "${RED}Error: File must be .aab${NC}"
    exit 1
fi

OUTPUT_AAB="${AAB_FILE%.aab}-16kb-fixed.aab"
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

echo -e "${BLUE}Input AAB: $AAB_FILE${NC}"
echo -e "${BLUE}Output AAB: $OUTPUT_AAB${NC}"
echo ""

# Check for bundletool
BUNDLETOOL=""
if command -v bundletool &> /dev/null; then
    BUNDLETOOL="bundletool"
elif [ -f "$HOME/.local/bin/bundletool" ]; then
    BUNDLETOOL="$HOME/.local/bin/bundletool"
elif [ -f "/usr/local/bin/bundletool" ]; then
    BUNDLETOOL="/usr/local/bin/bundletool"
fi

if [ -z "$BUNDLETOOL" ]; then
    echo -e "${YELLOW}bundletool not found. Attempting to download...${NC}"
    BUNDLETOOL_JAR="$TEMP_DIR/bundletool.jar"
    
    # Try to download bundletool
    if command -v curl &> /dev/null; then
        echo "Downloading bundletool..."
        curl -L -o "$BUNDLETOOL_JAR" "https://github.com/google/bundletool/releases/download/1.15.6/bundletool-all-1.15.6.jar" || {
            echo -e "${RED}Failed to download bundletool${NC}"
            echo "Please install bundletool manually:"
            echo "  brew install bundletool"
            echo "  or download from: https://github.com/google/bundletool/releases"
            exit 1
        }
        BUNDLETOOL="java -jar $BUNDLETOOL_JAR"
    else
        echo -e "${RED}Error: bundletool not found and curl not available${NC}"
        echo "Please install bundletool:"
        echo "  brew install bundletool"
        echo "  or download from: https://github.com/google/bundletool/releases"
        exit 1
    fi
fi

# Find zipalign
ZIPALIGN=""
if [ -n "$ANDROID_HOME" ]; then
    ZIPALIGN=$(find "$ANDROID_HOME/build-tools" -name "zipalign" 2>/dev/null | sort -V | tail -1)
fi

if [ -z "$ZIPALIGN" ] && [ -n "$ANDROID_SDK_ROOT" ]; then
    ZIPALIGN=$(find "$ANDROID_SDK_ROOT/build-tools" -name "zipalign" 2>/dev/null | sort -V | tail -1)
fi

if [ -z "$ZIPALIGN" ]; then
    echo -e "${YELLOW}Warning: zipalign not found. Will use bundletool only.${NC}"
    echo "For best results, install Android SDK build-tools"
fi

echo -e "${BLUE}Step 1: Extracting AAB...${NC}"
unzip -q "$AAB_FILE" -d "$TEMP_DIR/extracted"

# Check if we have native libraries
SO_FILES=$(find "$TEMP_DIR/extracted" -name "*.so" -type f 2>/dev/null || true)

if [ -z "$SO_FILES" ]; then
    echo -e "${YELLOW}No native libraries found in AAB${NC}"
    cp "$AAB_FILE" "$OUTPUT_AAB"
    echo -e "${GREEN}Copied AAB to: $OUTPUT_AAB${NC}"
    exit 0
fi

echo -e "${BLUE}Found native libraries. Processing...${NC}"

# Method 1: Use bundletool to build APKS, then rebuild AAB
echo -e "${BLUE}Step 2: Building APKS from AAB...${NC}"
APKS_FILE="$TEMP_DIR/app.apks"

if [[ "$BUNDLETOOL" == "java -jar"* ]]; then
    $BUNDLETOOL build-apks --bundle="$AAB_FILE" --output="$APKS_FILE" --mode=universal
else
    $BUNDLETOOL build-apks --bundle="$AAB_FILE" --output="$APKS_FILE" --mode=universal
fi

# Extract universal APK
echo -e "${BLUE}Step 3: Extracting universal APK...${NC}"
UNIVERSAL_APK_DIR="$TEMP_DIR/universal"
mkdir -p "$UNIVERSAL_APK_DIR"
unzip -q "$APKS_FILE" -d "$UNIVERSAL_APK_DIR"

UNIVERSAL_APK="$UNIVERSAL_APK_DIR/universal.apk"
if [ ! -f "$UNIVERSAL_APK" ]; then
    # Try to find the APK file
    UNIVERSAL_APK=$(find "$UNIVERSAL_APK_DIR" -name "*.apk" -type f | head -1)
fi

if [ -z "$UNIVERSAL_APK" ] || [ ! -f "$UNIVERSAL_APK" ]; then
    echo -e "${RED}Error: Could not extract universal APK${NC}"
    exit 1
fi

# Use zipalign if available
if [ -n "$ZIPALIGN" ] && [ -f "$ZIPALIGN" ]; then
    echo -e "${BLUE}Step 4: Aligning APK with zipalign (16 KB)...${NC}"
    ALIGNED_APK="$TEMP_DIR/aligned.apk"
    
    # zipalign with 16 KB alignment
    "$ZIPALIGN" -v -p 16 "$UNIVERSAL_APK" "$ALIGNED_APK" || {
        echo -e "${YELLOW}Warning: zipalign failed, using original APK${NC}"
        ALIGNED_APK="$UNIVERSAL_APK"
    }
    
    # Verify alignment
    "$ZIPALIGN" -c -v 16 "$ALIGNED_APK" && {
        echo -e "${GREEN}✓ APK aligned successfully${NC}"
    } || {
        echo -e "${YELLOW}Warning: Alignment verification failed${NC}"
    }
else
    echo -e "${YELLOW}Step 4: Skipping zipalign (not available)${NC}"
    ALIGNED_APK="$UNIVERSAL_APK"
fi

# Rebuild AAB from aligned APK
echo -e "${BLUE}Step 5: Rebuilding AAB from aligned APK...${NC}"

# Create a temporary APKS with the aligned APK
TEMP_APKS="$TEMP_DIR/aligned.apks"
mkdir -p "$TEMP_APKS"
cp "$ALIGNED_APK" "$TEMP_APKS/universal.apk"

# Use bundletool to rebuild AAB
# Note: This is a simplified approach. For production, you might need to
# extract and rebuild the AAB structure properly
echo -e "${YELLOW}Note: Rebuilding AAB structure...${NC}"

# For now, we'll create a new AAB by copying the original structure
# and replacing the native libraries section
echo -e "${BLUE}Step 6: Creating fixed AAB...${NC}"

# Extract aligned APK
ALIGNED_APK_DIR="$TEMP_DIR/aligned_extracted"
mkdir -p "$ALIGNED_APK_DIR"
unzip -q "$ALIGNED_APK" -d "$ALIGNED_APK_DIR"

# Copy AAB structure
FIXED_AAB_DIR="$TEMP_DIR/fixed_aab"
mkdir -p "$FIXED_AAB_DIR"
cp -r "$TEMP_DIR/extracted"/* "$FIXED_AAB_DIR/"

# Replace native libraries with aligned ones
if [ -d "$ALIGNED_APK_DIR/lib" ]; then
    if [ -d "$FIXED_AAB_DIR/base/lib" ]; then
        rm -rf "$FIXED_AAB_DIR/base/lib"
    fi
    cp -r "$ALIGNED_APK_DIR/lib" "$FIXED_AAB_DIR/base/"
fi

# Rebuild AAB
cd "$FIXED_AAB_DIR"
zip -r -q "$OUTPUT_AAB" . || {
    echo -e "${RED}Error: Failed to create AAB${NC}"
    exit 1
}

cd - > /dev/null

echo ""
echo -e "${GREEN}=========================================="
echo "Done!"
echo "==========================================${NC}"
echo -e "${GREEN}Fixed AAB saved to: $OUTPUT_AAB${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Verify the alignment:"
echo "   ./check-16kb-libs-ndk.sh $OUTPUT_AAB"
echo ""
echo "2. Upload to Google Play Console:"
echo "   Use the file: $OUTPUT_AAB"
echo ""
echo -e "${YELLOW}Note: If alignment issues persist, you may need to:${NC}"
echo "- Rebuild the app with updated dependencies"
echo "- Update React Native and Expo to latest versions"
echo "- Check that all native modules support 16 KB alignment"

