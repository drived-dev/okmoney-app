# คู่มือแก้ปัญหา 16 KB Page Size Alignment

## ปัญหา
เมื่ออัพโหลดไฟล์ .aab ไปยัง Google Play Store จะได้รับ error:
```
Support 16 KB page sizes
```

ปัญหานี้เกิดจาก native libraries (.so files) ที่มี alignment เป็น 4096 bytes (4 KB) แต่ Google Play Store ต้องการ 16384 bytes (16 KB)

## วิธีแก้ไข

### วิธีที่ 1: Rebuild ด้วยการตั้งค่าที่ถูกต้อง (แนะนำ)

#### ขั้นตอนที่ 1: ตรวจสอบการตั้งค่า

ตรวจสอบว่าไฟล์ `android/gradle.properties` มีการตั้งค่าดังนี้:
```properties
android.supportsR16kPages=true
android.forceNativeLibPageSizeAlign=16384
expo.useLegacyPackaging=false
```

#### ขั้นตอนที่ 2: Clean และ Rebuild

```bash
# Clean build
cd android
./gradlew clean
cd ..

# Clean node_modules (ถ้าจำเป็น)
rm -rf node_modules
npm install

# Rebuild native modules
npx expo prebuild --clean

# Build AAB ใหม่
eas build --platform android --profile production
```

#### ขั้นตอนที่ 3: ตรวจสอบผลลัพธ์

```bash
# ตรวจสอบ alignment
./check-16kb-libs-ndk.sh app-release.aab
```

### วิธีที่ 2: ใช้สคริปต์แก้ไข AAB ที่ build แล้ว

หากคุณมีไฟล์ .aab ที่ build แล้วและต้องการแก้ไข:

```bash
# ใช้สคริปต์แก้ไข
./fix-16kb-aab.sh app-release.aab

# ตรวจสอบผลลัพธ์
./check-16kb-libs-ndk.sh app-release-16kb-fixed.aab
```

**หมายเหตุ**: วิธีนี้อาจไม่แก้ปัญหาได้ทั้งหมด เนื่องจาก native libraries ที่มาจาก dependencies ถูก build มาก่อนแล้วด้วย 4 KB alignment

### วิธีที่ 3: อัปเดต Dependencies

ตรวจสอบและอัปเดต dependencies ที่มี native code:

```bash
# ตรวจสอบเวอร์ชัน
npx expo --version
npx react-native --version

# อัปเดต dependencies
npm update
npx expo install --fix

# Rebuild
npx expo prebuild --clean
eas build --platform android --profile production
```

## การตรวจสอบ

### ใช้สคริปต์ตรวจสอบ

```bash
# วิธีที่ 1: ใช้ system readelf (ต้องติดตั้ง binutils)
./check-16kb-libs.sh app-release.aab

# วิธีที่ 2: ใช้ Android NDK readelf (แนะนำ)
./check-16kb-libs-ndk.sh app-release.aab
```

### ติดตั้ง Dependencies สำหรับการตรวจสอบ

**macOS:**
```bash
brew install binutils
```

**Linux:**
```bash
sudo apt-get install binutils
```

## Libraries ที่มักมีปัญหา

1. **React Native Core** - ต้องใช้เวอร์ชัน 0.76.9+ (คุณใช้อยู่แล้ว ✅)
2. **Expo Modules** - ต้องใช้เวอร์ชัน 52+ (คุณใช้อยู่แล้ว ✅)
3. **Hermes Engine** - ต้องใช้เวอร์ชันที่รองรับ 16 KB
4. **Third-party native modules** - ต้องอัปเดตเป็นเวอร์ชันล่าสุด

## สาเหตุที่ยังมีปัญหา

แม้ว่าคุณจะมีการตั้งค่าที่ถูกต้องแล้ว แต่ native libraries ที่มาจาก dependencies อาจยังไม่รองรับ 16 KB alignment เพราะ:

1. Libraries ถูก build มาก่อนแล้วด้วย 4 KB alignment
2. Dependencies ยังไม่รองรับ 16 KB alignment
3. ต้อง rebuild native modules ใหม่

## วิธีแก้ไขที่แนะนำที่สุด

1. **อัปเดต dependencies ทั้งหมด:**
   ```bash
   npm update
   npx expo install --fix
   ```

2. **Clean และ rebuild:**
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npx expo prebuild --clean
   ```

3. **Build ใหม่:**
   ```bash
   eas build --platform android --profile production
   ```

4. **ตรวจสอบผลลัพธ์:**
   ```bash
   ./check-16kb-libs-ndk.sh app-release.aab
   ```

## ถ้ายังไม่ผ่าน

หาก libraries ยังไม่ผ่านหลัง rebuild:

1. **ตรวจสอบรายการ libraries ที่ไม่ผ่าน:**
   ```bash
   ./check-16kb-libs-ndk.sh app-release.aab
   ```

2. **ตรวจสอบว่า libraries เหล่านั้นมาจาก dependencies ไหน:**
   - `libreactnative.so` - มาจาก React Native
   - `libhermes.so` - มาจาก Hermes Engine
   - `libexpo-modules-core.so` - มาจาก Expo
   - `libreanimated.so` - มาจาก react-native-reanimated
   - และอื่นๆ

3. **อัปเดต dependencies ที่เกี่ยวข้อง:**
   ```bash
   npm update react-native expo react-native-reanimated
   npx expo install --fix
   ```

4. **ติดต่อ maintainers** ของ libraries ที่ไม่ผ่าน (ถ้าจำเป็น)

## ข้อมูลเพิ่มเติม

- [Google Play 16 KB Page Size Requirements](https://developer.android.com/guide/practices/page-sizes)
- [Android NDK 16 KB Support](https://developer.android.com/ndk/guides/build#16kb)
- [React Native 16 KB Support](https://reactnative.dev/docs/16kb-page-size)

## สรุป

วิธีที่ดีที่สุดคือ:
1. ✅ ตรวจสอบการตั้งค่าใน `gradle.properties` (มีอยู่แล้ว)
2. ✅ Clean และ rebuild native modules
3. ✅ Build AAB ใหม่
4. ✅ ตรวจสอบผลลัพธ์ด้วยสคริปต์

หากยังมีปัญหา ให้อัปเดต dependencies และ rebuild ใหม่

