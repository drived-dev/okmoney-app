# วิธีแก้ปัญหา 16 KB Page Size - แบบเร็ว

## ปัญหา
อัพโหลด .aab ไปยัง Google Play Store แล้วได้รับ error: **Support 16 KB page sizes**

## วิธีแก้ไข (แนะนำ)

### ขั้นตอนที่ 1: ตรวจสอบการตั้งค่า

ตรวจสอบว่าไฟล์ `android/gradle.properties` มีการตั้งค่าดังนี้:

```properties
android.supportsR16kPages=true
android.forceNativeLibPageSizeAlign=16384
expo.useLegacyPackaging=false
```

✅ **คุณมีการตั้งค่าเหล่านี้อยู่แล้ว**

### ขั้นตอนที่ 2: Clean และ Rebuild

```bash
# 1. Clean build
cd android
./gradlew clean
cd ..

# 2. Rebuild native modules
npx expo prebuild --clean

# 3. Build AAB ใหม่
eas build --platform android --profile production
```

### ขั้นตอนที่ 3: ตรวจสอบผลลัพธ์

```bash
# Download AAB จาก EAS
# แล้วตรวจสอบด้วย:
./check-16kb-libs-ndk.sh app-release.aab
```

## ใช้สคริปต์อัตโนมัติ

```bash
./fix-16kb-simple.sh
```

สคริปต์จะช่วยคุณ clean และ rebuild อัตโนมัติ

## ทำไมต้อง Rebuild?

Native libraries (.so files) ที่มาจาก dependencies ถูก build มาก่อนแล้วด้วย 4 KB alignment. การแก้ไข AAB ที่ build แล้วอาจไม่แก้ปัญหาได้ทั้งหมด เพราะ:

1. Libraries ถูก compile มาก่อนแล้ว
2. ELF alignment ถูกกำหนดตอน compile time
3. ต้อง rebuild native modules ใหม่ด้วยการตั้งค่าที่ถูกต้อง

## ถ้ายังมีปัญหา

1. **อัปเดต dependencies:**
   ```bash
   npm update
   npx expo install --fix
   ```

2. **ตรวจสอบเวอร์ชัน:**
   - React Native 0.76.9+ ✅ (คุณใช้อยู่แล้ว)
   - Expo SDK 52+ ✅ (คุณใช้อยู่แล้ว)
   - NDK 26.1.10909125 ✅ (คุณใช้อยู่แล้ว)

3. **Rebuild อีกครั้ง:**
   ```bash
   cd android && ./gradlew clean && cd ..
   npx expo prebuild --clean
   eas build --platform android --profile production
   ```

## สรุป

✅ **การตั้งค่าถูกต้องแล้ว**  
✅ **ต้อง rebuild ใหม่เท่านั้น**  
✅ **ใช้สคริปต์ `fix-16kb-simple.sh` เพื่อความสะดวก**

