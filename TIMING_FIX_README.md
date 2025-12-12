# การแก้ไขปัญหา Timing และ Error ในหน้า (tabs)/index.tsx

## ปัญหาที่พบ

เมื่อผู้ใช้ login แล้วไปที่อื่น แล้วกลับเข้ามาในแอพ จะเข้าสู่หน้า Dashboard ก่อน แล้วเมื่อเข้าสู่หน้าหลัก (tabs)/index.tsx จะเกิด error และแสดงหน้าจอ error ตามที่เห็นในรูป

## สาเหตุของปัญหา

1. **DebtorErrorBoundary มีปัญหา**: ใช้ `useLoanStore.getState()` ใน `componentDidCatch` ซึ่งไม่ควรทำใน class component
2. **ขาดการป้องกัน null/undefined**: ไม่มีการตรวจสอบข้อมูลก่อนใช้งาน
3. **Error handling ไม่เพียงพอ**: ไม่มีการจัดการ error ในส่วนการ render และ filtering
4. **Timing Issue**: การ fetch ข้อมูลอาจช้า ทำให้ component render ก่อนที่ข้อมูลจะมา
5. **Race Conditions**: มีการเรียก fetch ข้อมูลหลายครั้งพร้อมกัน

## การแก้ไขที่ทำ (รอบที่ 2)

### 1. ปรับปรุง useLoanStore.ts

- เพิ่ม `hasLoaded` state เพื่อติดตามว่าข้อมูลถูกโหลดแล้วหรือยัง
- เพิ่ม `clearError` function สำหรับ clear error
- เพิ่มการป้องกัน duplicate requests
- เพิ่ม console.log เพื่อ debug
- ปรับปรุง error handling ให้ครอบคลุมมากขึ้น

### 2. ปรับปรุง (tabs)/index.tsx

- เพิ่ม `isInitialLoad` state สำหรับติดตามการโหลดครั้งแรก
- ปรับปรุง loading state logic ให้ครอบคลุมมากขึ้น
- เพิ่มการป้องกัน null/undefined ในส่วนการใช้งาน user data
- เพิ่ม safety check ก่อน render component
- ปรับปรุง error state UI ให้ดูดีขึ้น
- เพิ่ม debug logging เพื่อช่วยในการ troubleshoot
- แก้ไข linting errors

### 3. การป้องกัน Error เพิ่มเติม

- เพิ่มการตรวจสอบ `loans` array ก่อนใช้งาน
- เพิ่มการตรวจสอบ `user` object ก่อนใช้งาน
- เพิ่ม error handling ในส่วนการ filter ข้อมูล
- เพิ่ม try-catch ในส่วนการ render แต่ละ LoanCard
- เพิ่มการป้องกัน race conditions

## ผลลัพธ์

- แอพจะไม่ crash เมื่อมี error เกิดขึ้น
- Error boundary จะทำงานได้อย่างถูกต้อง
- ผู้ใช้สามารถกด "รีเฟรชข้อมูล" เพื่อลองโหลดข้อมูลใหม่
- ผู้ใช้สามารถกด "กลับหน้าหลัก" เพื่อไปหน้า dashboard
- การโหลดข้อมูลจะมี loading state ที่ชัดเจน
- ป้องกัน duplicate API calls
- มี debug logging เพื่อช่วยในการ troubleshoot

## ไฟล์ที่แก้ไข

1. `components/DebtorErrorBoundary.tsx`
2. `app/(screen)/(tabs)/index.tsx`
3. `store/use-loan-store.ts`

## การทดสอบ

กรุณาทดสอบโดย:

1. Login เข้าแอพ
2. ไปที่หน้าอื่น
3. กลับเข้ามาในแอพ
4. เข้าสู่หน้าหลัก (tabs)/index.tsx
5. ตรวจสอบว่าไม่มี error เกิดขึ้น
6. ตรวจสอบ console logs เพื่อดู debug information

## Debug Information

หากยังมีปัญหา กรุณาตรวจสอบ console logs:

- "Initial load: fetching loans..."
- "Starting to fetch loans..."
- "Successfully fetched loans: X"
- "Index component state: {...}"

## App Name

ชื่อแอพได้ถูกเปลี่ยนจาก "Okmoney" เป็น "Ok Money" ใน app.json แล้ว
