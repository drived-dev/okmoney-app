# วิธีแก้ไข Native Libraries ให้รองรับ 16 KB Page Size

## ปัญหา
Native libraries 68 ตัวยังไม่รองรับ 16 KB page size alignment (ยังใช้ 4 KB alignment)

## วิธีแก้ไข

### ขั้นตอนที่ 1: Clean และ Rebuild

```bash
# Clean build
cd android
./gradlew clean
cd ..

# Clean node_modules และ rebuild
rm -rf node_modules
npm install

# Rebuild native modules
npx expo prebuild --clean
```

### ขั้นตอนที่ 2: Build ใหม่

```bash
# Build AAB
eas build --platform android --profile production

# หรือ build locally
cd android
./gradlew bundleRelease
```

### ขั้นตอนที่ 3: ตรวจสอบผลลัพธ์

```bash
# ตรวจสอบ alignment
./check-16kb-libs-ndk.sh app-release.aab
```

## การตั้งค่าที่เพิ่มแล้ว

### 1. `android/gradle.properties`
- `android.supportsR16kPages=true`
- `android.forceNativeLibPageSizeAlign=16384`
- `expo.useLegacyPackaging=false`

### 2. `android/app/build.gradle`
- `buildConfigField "boolean", "SUPPORTS_R16K_PAGES", "true"`
- `useLegacyPackaging false`
- Post-processing script สำหรับ alignment

### 3. `android/align-16kb-libs.gradle`
- Script ที่จะ align native libraries หลัง build

## หมายเหตุสำคัญ

⚠️ **ปัญหาหลัก**: Libraries เหล่านี้มาจาก pre-built binaries จาก:
- React Native core
- Expo modules
- Third-party dependencies

**วิธีแก้ไขที่ถูกต้อง**:
1. **อัปเดต dependencies** เป็นเวอร์ชันที่รองรับ 16 KB:
   ```bash
   npm update react-native expo
   npx expo install --fix
   ```

2. **ตรวจสอบเวอร์ชัน**:
   - React Native 0.76.9 ✅ (รองรับ 16 KB)
   - Expo SDK 52 ✅ (รองรับ 16 KB)

3. **Rebuild native modules**:
   ```bash
   npx expo prebuild --clean
   ```

4. **Build ใหม่**:
   ```bash
   eas build --platform android --profile production
   ```

## ถ้ายังไม่ผ่าน

หาก libraries ยังไม่ผ่านหลัง rebuild อาจต้อง:

1. **ติดต่อ maintainers** ของ libraries ที่ไม่ผ่าน
2. **ใช้ alternative libraries** ที่รองรับ 16 KB
3. **รออัปเดต** จาก React Native/Expo teams

## Libraries ที่ผ่านแล้ว (4 ตัว)
- `libandroidx.graphics.path.so` (ทุก architecture)

## Libraries ที่ต้องแก้ไข (68 ตัว)
- `libreactnative.so`
- `libhermes.so`
- `libexpo-modules-core.so`
- `libreanimated.so`
- `libc++_shared.so`
- และอื่นๆ

## การทดสอบ

หลัง build ใหม่ ให้ตรวจสอบด้วย:
```bash
./check-16kb-libs-ndk.sh app-release.aab
```

ควรเห็น libraries ผ่านมากขึ้น หรือทั้งหมดผ่าน

