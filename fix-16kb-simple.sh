#!/bin/bash

# Simple script to check and provide instructions for fixing 16 KB alignment
# The best solution is to rebuild with proper settings

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}=========================================="
echo "16 KB Page Size Alignment Fix"
echo "==========================================${NC}"
echo ""

echo -e "${YELLOW}⚠️  หมายเหตุสำคัญ:${NC}"
echo "การแก้ไข AAB ที่ build แล้วอาจไม่แก้ปัญหาได้ทั้งหมด"
echo "เพราะ native libraries ถูก build มาก่อนแล้วด้วย 4 KB alignment"
echo ""
echo -e "${GREEN}วิธีที่ดีที่สุดคือ Rebuild ใหม่ด้วยการตั้งค่าที่ถูกต้อง${NC}"
echo ""

echo -e "${BLUE}ขั้นตอนที่แนะนำ:${NC}"
echo ""
echo "1. ตรวจสอบการตั้งค่าใน android/gradle.properties:"
echo "   - android.supportsR16kPages=true"
echo "   - android.forceNativeLibPageSizeAlign=16384"
echo "   - expo.useLegacyPackaging=false"
echo ""
echo "2. Clean และ rebuild:"
echo "   cd android"
echo "   ./gradlew clean"
echo "   cd .."
echo "   npx expo prebuild --clean"
echo "   eas build --platform android --profile production"
echo ""
echo "3. ตรวจสอบผลลัพธ์:"
echo "   ./check-16kb-libs-ndk.sh app-release.aab"
echo ""

read -p "ต้องการ rebuild ตอนนี้หรือไม่? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}เริ่ม rebuild...${NC}"
    echo ""
    
    # Clean
    echo "1. Cleaning build..."
    cd android
    ./gradlew clean
    cd ..
    
    # Prebuild
    echo ""
    echo "2. Rebuilding native modules..."
    npx expo prebuild --clean
    
    echo ""
    echo -e "${GREEN}✓ Clean และ prebuild เสร็จสิ้น${NC}"
    echo ""
    echo -e "${YELLOW}ขั้นตอนต่อไป:${NC}"
    echo "  eas build --platform android --profile production"
    echo ""
    echo "หลังจาก build เสร็จ ให้ตรวจสอบด้วย:"
    echo "  ./check-16kb-libs-ndk.sh app-release.aab"
else
    echo -e "${YELLOW}ข้าม rebuild${NC}"
    echo ""
    echo "หากต้องการ rebuild ภายหลัง ให้รัน:"
    echo "  cd android && ./gradlew clean && cd .."
    echo "  npx expo prebuild --clean"
    echo "  eas build --platform android --profile production"
fi

