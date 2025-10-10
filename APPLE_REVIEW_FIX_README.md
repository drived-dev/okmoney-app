# Apple App Store Review Fix - การแก้ไข Apple App Store Review Issue

## ปัญหาที่เกิดขึ้น

**Guideline 5.1.1 - Legal - Privacy - Data Collection and Storage**

Apple ปฏิเสธแอพเนื่องจาก purpose strings ไม่ชัดเจนเพียงพอ โดยเฉพาะ:

> "One or more purpose strings in the app do not sufficiently explain the use of protected resources. Purpose strings must clearly and completely describe the app's use of data and, in most cases, provide an example of how the data will be used."

## สาเหตุหลัก

Purpose strings เดิมไม่ชัดเจนและไม่มีตัวอย่างการใช้งาน:

**เดิม:**

- `"Allow $(PRODUCT_NAME) to access your photos"`
- `"Allow $(PRODUCT_NAME) to access your camera"`
- `"Allow $(PRODUCT_NAME) to access your microphone"`

## วิธีแก้ไขที่ได้ทำ

### 1. NSPhotoLibraryUsageDescription (หลัก)

**เดิม:**

```xml
<string>Allow $(PRODUCT_NAME) to access your photos</string>
```

**ใหม่:**

```xml
<string>Ok Money needs access to your photo library to allow you to upload payment receipts and profile pictures. For example, you can select a photo of a bank transfer receipt to attach to a payment record, or choose a profile picture for your store account.</string>
```

### 2. NSCameraUsageDescription

**เดิม:**

```xml
<string>Allow $(PRODUCT_NAME) to access your camera</string>
```

**ใหม่:**

```xml
<string>Ok Money needs access to your camera to take photos of payment receipts and profile pictures. For example, you can take a photo of a bank transfer receipt to attach to a payment record, or take a new profile picture for your store account.</string>
```

### 3. NSMicrophoneUsageDescription

**เดิม:**

```xml
<string>Allow $(PRODUCT_NAME) to access your microphone</string>
```

**ใหม่:**

```xml
<string>Ok Money needs access to your microphone for voice recording features. For example, you can record voice notes to attach to payment records or debtor information for better record keeping.</string>
```

### 4. NSFaceIDUsageDescription

**เดิม:**

```xml
<string>Allow $(PRODUCT_NAME) to access your Face ID biometric data.</string>
```

**ใหม่:**

```xml
<string>Ok Money needs access to your Face ID for secure authentication and app protection. For example, you can use Face ID to quickly unlock the app and protect your financial data from unauthorized access.</string>
```

## หลักการที่ใช้ในการแก้ไข

### 1. **ชัดเจน (Clear)**

- อธิบายว่าแอพต้องการใช้ข้อมูลเพื่ออะไร
- ใช้คำที่เข้าใจง่าย ไม่เป็นเทคนิคเกินไป

### 2. **เฉพาะเจาะจง (Specific)**

- ระบุฟีเจอร์ที่ใช้ข้อมูลนั้น
- ไม่ใช้คำทั่วไป เช่น "for app functionality"

### 3. **มีตัวอย่าง (Examples)**

- ให้ตัวอย่างการใช้งานจริง
- ใช้ "For example" เพื่อแสดงสถานการณ์เฉพาะ

### 4. **เกี่ยวข้องกับแอพ (Relevant)**

- อธิบายการใช้งานที่เกี่ยวข้องกับฟีเจอร์ของแอพ
- เชื่อมโยงกับประโยชน์ของผู้ใช้

## ตัวอย่างที่ Apple ต้องการ

### ✅ **ดี (ผ่านการตรวจสอบ)**

```
"Ok Money needs access to your photo library to allow you to upload payment receipts and profile pictures. For example, you can select a photo of a bank transfer receipt to attach to a payment record, or choose a profile picture for your store account."
```

### ❌ **ไม่ดี (ไม่ผ่านการตรวจสอบ)**

```
"Allow OkMoney to access your photos"
"App needs microphone access"
"App would like to access your Contacts"
```

## การใช้งานในแอพ

### Photo Library Usage

- **Upload payment receipts** - อัปโหลดหลักฐานการโอนเงิน
- **Profile pictures** - รูปโปรไฟล์ร้านค้า

### Camera Usage

- **Take receipt photos** - ถ่ายรูปหลักฐานการโอนเงิน
- **Profile picture capture** - ถ่ายรูปโปรไฟล์

### Microphone Usage

- **Voice notes** - บันทึกเสียงสำหรับข้อมูลลูกหนี้
- **Payment records** - บันทึกเสียงสำหรับรายการชำระ

### Face ID Usage

- **App authentication** - การยืนยันตัวตน
- **Data protection** - ป้องกันข้อมูลทางการเงิน

## ไฟล์ที่แก้ไข

- `ios/Okmoney/Info.plist` - อัปเดต purpose strings ทั้งหมด

## หมายเหตุ

1. **ต้อง Rebuild** - ต้อง build แอพใหม่เพื่อให้การเปลี่ยนแปลงมีผล
2. **Test on Device** - ทดสอบบนอุปกรณ์จริงเพื่อดู permission prompts
3. **App Store Connect** - ส่งแอพใหม่ไปยัง App Store Connect
4. **Review Process** - Apple จะตรวจสอบ purpose strings ใหม่

## ขั้นตอนต่อไป

1. **Build แอพใหม่** ด้วย purpose strings ที่อัปเดต
2. **Test permission prompts** บนอุปกรณ์จริง
3. **Submit ไปยัง App Store Connect**
4. **รอการตรวจสอบจาก Apple**

การแก้ไขนี้ควรผ่านการตรวจสอบ Apple App Store Review แล้วครับ!
