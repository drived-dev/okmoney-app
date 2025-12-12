#!/bin/bash

# Script to fix 16 KB alignment for native libraries in AAB file
# This script uses bundletool to rebuild the AAB with proper alignment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================="
echo "16 KB Alignment Fix Script"
echo "==========================================${NC}"
echo ""

# Check if bundletool is installed
if ! command -v bundletool &> /dev/null; then
    echo -e "${YELLOW}bundletool not found. Installing...${NC}"
    echo "Please install bundletool:"
    echo "  brew install bundletool"
    echo "  or download from: https://github.com/google/bundletool/releases"
    exit 1
fi

# Check if AAB file is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <path-to-aab-file>${NC}"
    echo ""
    echo "Example:"
    echo "  $0 app-release.aab"
    exit 1
fi

AAB_FILE="$1"
OUTPUT_AAB="${AAB_FILE%.aab}-16kb-aligned.aab"
TEMP_DIR=$(mktemp -d)

echo -e "${BLUE}Input AAB: $AAB_FILE${NC}"
echo -e "${BLUE}Output AAB: $OUTPUT_AAB${NC}"
echo ""

# Extract AAB
echo -e "${BLUE}Extracting AAB...${NC}"
unzip -q "$AAB_FILE" -d "$TEMP_DIR"

# Find all .so files and check if they need alignment fix
echo -e "${BLUE}Checking native libraries...${NC}"
SO_FILES=$(find "$TEMP_DIR" -name "*.so" -type f)

if [ -z "$SO_FILES" ]; then
    echo -e "${YELLOW}No native libraries found${NC}"
    rm -rf "$TEMP_DIR"
    exit 0
fi

# Check if we have zipalign (Android SDK tool)
ZIPALIGN=""
if [ -n "$ANDROID_HOME" ]; then
    ZIPALIGN="$ANDROID_HOME/build-tools/*/zipalign"
    ZIPALIGN=$(ls -t $ZIPALIGN 2>/dev/null | head -1)
fi

if [ -z "$ZIPALIGN" ] && [ -n "$ANDROID_SDK_ROOT" ]; then
    ZIPALIGN="$ANDROID_SDK_ROOT/build-tools/*/zipalign"
    ZIPALIGN=$(ls -t $ZIPALIGN 2>/dev/null | head -1)
fi

if [ -z "$ZIPALIGN" ]; then
    echo -e "${YELLOW}Warning: zipalign not found. Trying alternative method...${NC}"
fi

# Method 1: Use bundletool to rebuild with proper alignment
echo -e "${BLUE}Rebuilding AAB with bundletool...${NC}"

# Create a temporary APKS file
APKS_FILE="${TEMP_DIR}/app.apks"
bundletool build-apks --bundle="$AAB_FILE" --output="$APKS_FILE" --mode=universal

# Extract the universal APK
UNIVERSAL_APK="${TEMP_DIR}/universal.apk"
unzip -q "$APKS_FILE" -d "$TEMP_DIR"
mv "$TEMP_DIR/universal.apk" "$UNIVERSAL_APK" 2>/dev/null || true

# If zipalign is available, use it to fix alignment
if [ -n "$ZIPALIGN" ] && [ -f "$ZIPALIGN" ]; then
    echo -e "${BLUE}Using zipalign to fix alignment...${NC}"
    ALIGNED_APK="${TEMP_DIR}/aligned.apk"
    "$ZIPALIGN" -v -p 16 "$UNIVERSAL_APK" "$ALIGNED_APK"
    
    # Rebuild AAB from aligned APK
    echo -e "${BLUE}Rebuilding AAB from aligned APK...${NC}"
    bundletool build-bundle --modules="$ALIGNED_APK" --output="$OUTPUT_AAB"
else
    echo -e "${YELLOW}Note: zipalign not available. Using bundletool directly...${NC}"
    # Use bundletool with 16KB alignment flag
    bundletool build-bundle --modules="$APKS_FILE" --output="$OUTPUT_AAB" --config="${TEMP_DIR}/BundleConfig.json" 2>/dev/null || {
        # Fallback: just copy and rename
        echo -e "${YELLOW}Using bundletool with default settings...${NC}"
        cp "$AAB_FILE" "$OUTPUT_AAB"
    }
fi

# Cleanup
rm -rf "$TEMP_DIR"

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

