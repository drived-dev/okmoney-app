# Navigation Error Fix - การแก้ไขปัญหา Navigation Error

## ปัญหาที่เกิดขึ้น

เมื่อแอพไม่ได้ใช้งานนานๆ หรือเมื่อไปใช้แอพอื่น หรือหลังจาก clear cache แล้วกลับเข้ามาในแอพ จะเข้าไปที่หน้า Dashboard แต่เมื่อจะ navigate ไปที่อื่นจาก navigation bar จะเกิด error

## สาเหตุหลัก

1. **Navigation State Corruption** - สถานะ navigation เสียหายเมื่อแอพกลับมาจาก background
2. **User Store Persistence Issues** - ข้อมูล user อาจจะหายไปชั่วคราวเมื่อ clear cache
3. **Race Conditions** - การตรวจสอบ user state ก่อนที่ store จะ load เสร็จ
4. **Missing Error Handling** - ไม่มีการจัดการ error ที่เหมาะสมใน navigation

## วิธีแก้ไขที่ได้ทำ

### 1. สร้าง ErrorBoundary Component (`components/ErrorBoundary.tsx`)

- จับและจัดการ JavaScript errors ที่เกิดขึ้นในแอพ
- แสดง UI ที่เป็นมิตรกับผู้ใช้เมื่อเกิด error
- มีปุ่มให้ restart แอพหรือกลับหน้าหลัก

### 2. สร้าง Navigation Utilities (`lib/navigation-utils.ts`)

- Utility functions สำหรับการ navigate อย่างปลอดภัย
- Error handling สำหรับ navigation operations
- Custom error types สำหรับ navigation errors
- Hook สำหรับใช้งานใน components

### 3. อัปเดต Main Layout (`app/_layout.tsx`)

- เพิ่ม ErrorBoundary
- จัดการ error handling ในระดับแอพ

### 4. อัปเดต Screen Layout (`app/(screen)/_layout.tsx`)

- เพิ่ม loading state ขณะรอ user store load
- ปรับปรุงการตรวจสอบ user authentication
- ใช้ router.replace แทนการแสดง LoginScreen โดยตรง

### 5. อัปเดต Axios Interceptor (`lib/axios.ts`)

- ใช้ safe navigation utilities
- ปรับปรุง error handling สำหรับ 401 errors

## วิธีใช้งาน

### 1. ใช้ Safe Navigation Hook

```typescript
import { useSafeNavigation } from '~/lib/navigation-utils';

const MyComponent = () => {
  const { navigate, navigateBack, isReady } = useSafeNavigation();

  const handleNavigation = async () => {
    await navigate('/(screen)/(tabs)/dashboard', 'replace');
  };

  return (
    // Your component JSX
  );
};
```

### 2. ใช้ Safe Navigation Utilities โดยตรง

```typescript
import { safeNavigate } from "~/lib/navigation-utils";

// Navigate with error handling
try {
  await safeNavigate.push("/(screen)/(tabs)/history");
} catch (error) {
  console.error("Navigation failed:", error);
}
```

## การทดสอบ

1. **ทดสอบ Background/Foreground**

   - เปิดแอพและเข้าไปที่ Dashboard
   - ไปใช้แอพอื่นแล้วกลับมา
   - ลอง navigate ไปหน้าอื่น

2. **ทดสอบ Clear Cache**

   - Clear cache ของแอพ
   - เปิดแอพใหม่
   - ลอง navigate ไปหน้าอื่น

3. **ทดสอบ Session Expiry**
   - รอให้ session หมดอายุ
   - ลองใช้ฟีเจอร์ต่างๆ
   - ตรวจสอบว่าถูก redirect ไป login

## ข้อดีของการแก้ไข

1. **Stability** - แอพจะเสถียรขึ้นเมื่อกลับมาจาก background
2. **User Experience** - ผู้ใช้จะไม่เจอ error ที่ไม่เข้าใจ
3. **Error Recovery** - แอพสามารถกู้คืนจาก error ได้เอง
4. **Maintainability** - Code ง่ายต่อการดูแลรักษา
5. **Debugging** - มี error logging ที่ดีขึ้น

## การแก้ไขปัญหา Loading ตลอดเวลา

**ปัญหา:** แอพขึ้น "กำลังโหลด..." ตลอดเวลา

**สาเหตุ:** NavigationWrapper มีปัญหาในการตรวจสอบ user state และ navigation state

**วิธีแก้ไข:**

- ลบ NavigationWrapper ออกจาก main layout
- ปรับปรุง screen layout ให้ใช้ loading state ที่เหมาะสม
- เพิ่ม delay 200ms เพื่อให้ user store load เสร็จก่อน

## หมายเหตุ

- การแก้ไขนี้จะป้องกัน navigation errors ที่เกิดจากการเปลี่ยนแปลงสถานะของแอพ
- ErrorBoundary จะจับ JavaScript errors และแสดง UI ที่เหมาะสม
- Safe navigation utilities จะป้องกัน navigation errors ในอนาคต
- Loading state จะแสดงเพียง 200ms เพื่อให้ user store load เสร็จ

หากยังมีปัญหาเกิดขึ้น กรุณาตรวจสอบ console logs เพื่อดู error messages และรายงานกลับมา
