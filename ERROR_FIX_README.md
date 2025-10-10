# การแก้ไข Error ในหน้า (tabs)/index.tsx

## ปัญหาที่พบ

เมื่อผู้ใช้ login แล้วไปที่อื่น แล้วกลับเข้ามาในแอพ จะเข้าสู่หน้า Dashboard ก่อน แล้วเมื่อเข้าสู่หน้าหลัก (tabs)/index.tsx จะเกิด error และแสดงหน้าจอ error ตามที่เห็นในรูป

## สาเหตุของปัญหา

1. **DebtorErrorBoundary มีปัญหา**: ใช้ `useLoanStore.getState()` ใน `componentDidCatch` ซึ่งไม่ควรทำใน class component
2. **ขาดการป้องกัน null/undefined**: ไม่มีการตรวจสอบข้อมูลก่อนใช้งาน
3. **Error handling ไม่เพียงพอ**: ไม่มีการจัดการ error ในส่วนการ render และ filtering

## การแก้ไขที่ทำ

### 1. แก้ไข DebtorErrorBoundary.tsx

- ลบการใช้ `useLoanStore.getState()` ใน `componentDidCatch`
- เพิ่ม prop `onRefresh` เพื่อให้ parent component ส่ง callback function มา
- ทำให้ error boundary ทำงานได้อย่างถูกต้อง

### 2. ปรับปรุง (tabs)/index.tsx

- เพิ่ม `onRefresh={fetchLoans}` ใน DebtorErrorBoundary
- เพิ่ม try-catch ใน useEffect สำหรับการโหลดข้อมูล
- เพิ่มการป้องกัน null/undefined ในส่วนการ filter ข้อมูล
- เพิ่มการป้องกัน error ในส่วนการ render LoanCard
- เพิ่มการป้องกัน null/undefined สำหรับ user data

### 3. การป้องกัน Error เพิ่มเติม

- เพิ่มการตรวจสอบ `loans` array ก่อนใช้งาน
- เพิ่มการตรวจสอบ `user` object ก่อนใช้งาน
- เพิ่ม error handling ในส่วนการ filter ข้อมูล
- เพิ่ม try-catch ในส่วนการ render แต่ละ LoanCard

## ผลลัพธ์

- แอพจะไม่ crash เมื่อมี error เกิดขึ้น
- Error boundary จะทำงานได้อย่างถูกต้อง
- ผู้ใช้สามารถกด "รีเฟรชข้อมูล" เพื่อลองโหลดข้อมูลใหม่
- ผู้ใช้สามารถกด "กลับหน้าหลัก" เพื่อไปหน้า dashboard

## ไฟล์ที่แก้ไข

1. `components/DebtorErrorBoundary.tsx`
2. `app/(screen)/(tabs)/index.tsx`

## การทดสอบ

กรุณาทดสอบโดย:

1. Login เข้าแอพ
2. ไปที่หน้าอื่น
3. กลับเข้ามาในแอพ
4. เข้าสู่หน้าหลัก (tabs)/index.tsx
5. ตรวจสอบว่าไม่มี error เกิดขึ้น
