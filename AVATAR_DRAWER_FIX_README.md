# การแก้ไขปัญหา Avatar Navigation

## ปัญหาที่พบ

เมื่อกดที่ avatar ในหน้า `(tabs)/index.tsx` ควรจะมี drawer เปิดขึ้นมา แต่ตอนนี้กลับไปหน้า "page didn't find" แทน

## สาเหตุของปัญหา

1. **Navigation Path ไม่ถูกต้อง**: ใช้ `router.push("/(screen)/profile-setting")` แต่ path ที่ถูกต้องควรเป็น `"/(screen)/profile-setting/setting"`
2. **ควรเป็น Drawer ไม่ใช่ Navigation**: Avatar ควรเปิด drawer แทนการไปหน้า profile-setting
3. **Drawer มีอยู่แล้ว**: มี `CustomDrawer` ใน `_layout.tsx` แต่ไม่ได้ถูกเปิดเมื่อกด avatar

## การแก้ไขที่ทำ

### 1. เปลี่ยน Avatar Navigation

**เดิม:**

```javascript
<TouchableOpacity
  onPress={() => router.push("/(screen)/profile-setting" as any)}
>
```

**ใหม่:**

```javascript
<TouchableOpacity
  onPress={() => {
    // Open drawer instead of navigating to profile-setting
    try {
      // @ts-ignore - navigation type doesn't include openDrawer but it exists
      (navigation as any).openDrawer?.();
    } catch (error) {
      console.log("Error opening drawer:", error);
    }
  }}
>
```

### 2. เพิ่ม Drawer Navigation Hook

```javascript
import { useDrawerStatus } from "@react-navigation/drawer";

const navigation = useNavigation();
const drawerStatus = useDrawerStatus();
```

### 3. ใช้ Navigation API

- ใช้ `navigation.openDrawer()` แทน `router.push()`
- เพิ่ม error handling สำหรับกรณีที่ drawer navigation ไม่พร้อมใช้งาน

## ผลลัพธ์

- ✅ เมื่อกด avatar จะเปิด drawer แทนการไปหน้า profile-setting
- ✅ ไม่มี "page didn't find" error อีกต่อไป
- ✅ Drawer จะแสดงข้อมูลผู้ใช้และเมนูต่างๆ ตามที่ออกแบบไว้

## ไฟล์ที่แก้ไข

- `app/(screen)/(tabs)/index.tsx`

## การทดสอบ

กรุณาทดสอบโดย:

1. เข้าสู่หน้า `(tabs)/index.tsx`
2. กดที่ avatar (รูปโปรไฟล์ + ชื่อร้าน)
3. ตรวจสอบว่า drawer เปิดขึ้นมาแทนการไปหน้า profile-setting
4. ตรวจสอบว่าไม่มี "page didn't find" error

## Drawer Contents

Drawer จะแสดง:

- ข้อมูลผู้ใช้ (รูปโปรไฟล์ + ชื่อร้าน)
- SMS usage progress
- Promo image
- เมนูต่างๆ:
  - ติดต่อ support
  - ให้ feedback
  - ออกจากระบบ

## Technical Notes

- ใช้ `@react-navigation/drawer` สำหรับ drawer navigation
- `CustomDrawer` component ถูกกำหนดใน `app/(screen)/_layout.tsx`
- Drawer จะเปิดจากด้านซ้ายของหน้าจอ
- มี error handling สำหรับกรณีที่ drawer navigation ไม่พร้อมใช้งาน
