# วิธีตรวจสอบ Native Libraries ที่ไม่รองรับ 16 KB Page Size

## วิธีที่ 1: ใช้สคริปต์ตรวจสอบ (แนะนำ)

### ขั้นตอน:

1. **Build APK หรือ AAB:**
   ```bash
   eas build --platform android --profile production
   ```

2. **Download APK/AAB จาก EAS:**
   - ไปที่ EAS Dashboard
   - Download APK หรือ AAB ที่ build แล้ว

3. **รันสคริปต์ตรวจสอบ:**
   ```bash
   # วิธีที่ 1: ใช้ system readelf (ต้องติดตั้ง binutils)
   ./check-16kb-libs.sh app-release.aab
   
   # วิธีที่ 2: ใช้ Android NDK readelf (แนะนำ)
   ./check-16kb-libs-ndk.sh app-release.aab
   ```

### ติดตั้ง Dependencies:

**macOS:**
```bash
brew install binutils
```

**Linux:**
```bash
sudo apt-get install binutils
```

## วิธีที่ 2: ใช้ Google Play Console

1. อัปโหลด AAB ไปที่ Google Play Console
2. ไปที่ **Release > Production > App bundles**
3. ดู **Pre-launch report**
4. ตรวจสอบ **16 KB page size** section
5. จะแสดงรายการ libraries ที่ไม่ผ่าน

## วิธีที่ 3: ใช้ Android Studio

1. เปิด Android Studio
2. Build > Analyze APK
3. เลือก APK/AAB file
4. ดูในส่วน **Native Libraries**
5. ตรวจสอบ alignment ของแต่ละ library

## วิธีที่ 4: ใช้ Command Line (Manual)

```bash
# Extract APK/AAB
unzip app-release.aab -d extracted

# Extract base APK from AAB
unzip extracted/base/base.apk -d apk_extracted

# Find all .so files
find apk_extracted -name "*.so" -type f

# Check each library
readelf -l apk_extracted/lib/arm64-v8a/libxxx.so | grep Align
```

## การแก้ไข Libraries ที่ไม่ผ่าน

### 1. อัปเดต Dependencies

ตรวจสอบ `package.json` และอัปเดต dependencies ที่มี native code:

```bash
npm outdated
npm update
```

### 2. ตรวจสอบ React Native และ Expo

```bash
# ตรวจสอบเวอร์ชัน
npx expo --version
npx react-native --version

# อัปเดตถ้าจำเป็น
npx expo install --fix
```

### 3. ตรวจสอบ Native Modules

ตรวจสอบ native modules ที่ใช้:

```bash
# ดูรายการ native modules
grep -r "native" node_modules/*/package.json | grep -i "react-native"
```

### 4. Rebuild Native Libraries

บาง libraries อาจต้อง rebuild:

```bash
cd android
./gradlew clean
./gradlew assembleRelease
```

## Libraries ที่มักมีปัญหา

1. **React Native Core** - ต้องใช้เวอร์ชัน 0.73+
2. **Expo Modules** - ต้องใช้เวอร์ชัน 50+
3. **Hermes Engine** - ต้องใช้เวอร์ชันที่รองรับ 16 KB
4. **Third-party native modules** - ต้องอัปเดตเป็นเวอร์ชันล่าสุด

## ตัวอย่าง Output

```
==========================================
16 KB Page Size Library Checker
==========================================

Found 15 native library(ies)

Checking alignment...
==========================================
✓  lib/arm64-v8a/libhermes.so
   Architecture: arm64-v8a
   Alignment: 16384 bytes
   Status: PASSED

✗  lib/arm64-v8a/libc++_shared.so
   Architecture: arm64-v8a
   Alignment: 4096 bytes (needs 16384)
   Status: FAILED

==========================================
SUMMARY
==========================================
Total libraries: 15
Passed: 14
Failed: 1

FAILED LIBRARIES:
  - lib/arm64-v8a/libc++_shared.so

Recommendations:
1. Update the library to a version that supports 16 KB page sizes
2. Rebuild the library with 16 KB alignment
3. Contact the library maintainer for 16 KB support
4. Consider using an alternative library
```

## Troubleshooting

### ปัญหา: readelf not found

**แก้ไข:**
```bash
# macOS
brew install binutils

# หรือใช้ Android NDK
export PATH=$PATH:~/Library/Android/sdk/ndk/26.1.10909125/toolchains/llvm/prebuilt/darwin-x86_64/bin
```

### ปัญหา: Cannot extract AAB

**แก้ไข:**
- ใช้ `bundletool` จาก Google:
  ```bash
  brew install bundletool
  bundletool build-apks --bundle=app-release.aab --output=app.apks
  unzip app.apks -d extracted
  ```

## ข้อมูลเพิ่มเติม

- [Google Play 16 KB Page Size Requirements](https://developer.android.com/guide/practices/page-sizes)
- [Android NDK 16 KB Support](https://developer.android.com/ndk/guides/build#16kb)
- [React Native 16 KB Support](https://reactnative.dev/docs/16kb-page-size)

