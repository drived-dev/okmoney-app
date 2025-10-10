# BottomSheet Fix - การแก้ไขปัญหา BottomSheet

## ปัญหาที่เกิดขึ้น

1. **BottomSheet ไม่ขึ้นมาเท่ากันทุกครั้ง** - ความสูงไม่สม่ำเสมอ
2. **Android ไม่สามารถลาก BottomSheet ลงได้** - ไม่มี gesture handling

## สาเหตุหลัก

1. **ไม่มี Snap Points** - BottomSheet ไม่มีการกำหนดจุดหยุดที่ชัดเจน
2. **ไม่มี Gesture Handling** - ไม่มีการเปิดใช้งาน pan down to close
3. **ไม่มี Backdrop** - ไม่มีพื้นหลังมืดเมื่อเปิด BottomSheet
4. **Fixed MinHeight** - ใช้ minHeight แทน snap points

## วิธีแก้ไขที่ได้ทำ

### 1. เพิ่ม Snap Points ในทุก BottomSheet

#### MemoSheet (`components/main/memo-sheet.tsx`)

```typescript
const snapPoints = useMemo(() => ["50%", "75%"], []);
```

#### GuarantorSheet (`components/main/guarantor-sheet.tsx`)

```typescript
const snapPoints = useMemo(() => ["60%", "85%"], []);
```

#### DebtorModal (`components/main/debtor-info-modal.tsx`)

```typescript
const snapPoints = useMemo(() => ["70%", "90%"], []);
```

### 2. เพิ่ม Gesture Handling และ Backdrop

```typescript
<BottomSheetModal
  ref={bottomSheetModalRef}
  style={styles.shadow}
  snapPoints={snapPoints}
  enablePanDownToClose={true}        // เปิดใช้งานลากลงเพื่อปิด
  enableDismissOnClose={true}        // เปิดใช้งานการปิด
  backdropComponent={({ style }) => (
    <View style={[style, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]} />
  )}
>
```

### 3. ปรับปรุง Styles

**ก่อน:**

```typescript
contentContainer: {
  flex: 1,
  minHeight: 350,  // ความสูงคงที่
  gap: 16,
  padding: 20,
  width: "100%",
},
```

**หลัง:**

```typescript
contentContainer: {
  flex: 1,         // ใช้ flex แทน minHeight
  gap: 16,
  padding: 20,
  width: "100%",
},
```

## ข้อดีของการแก้ไข

### 1. **ความสม่ำเสมอ (Consistency)**

- BottomSheet จะขึ้นมาในตำแหน่งเดียวกันทุกครั้ง
- มี snap points ที่ชัดเจน (50%, 75% สำหรับ MemoSheet)

### 2. **Gesture Support**

- **iOS และ Android** สามารถลากลงเพื่อปิดได้
- มี backdrop ที่สามารถแตะเพื่อปิดได้

### 3. **User Experience ที่ดีขึ้น**

- Animation ที่ลื่นไหล
- การปิดที่ง่ายและเป็นธรรมชาติ
- พื้นหลังมืดช่วยให้ focus กับ content

### 4. **Responsive Design**

- ใช้ percentage แทน fixed height
- ปรับขนาดตามหน้าจอได้ดีขึ้น

## การใช้งาน

### Snap Points Behavior

1. **MemoSheet (50%, 75%)**

   - เปิดขึ้นมาที่ 50% ของหน้าจอ
   - ลากขึ้นไปได้ถึง 75%
   - ลากลงเพื่อปิดได้

2. **GuarantorSheet (60%, 85%)**

   - เปิดขึ้นมาที่ 60% ของหน้าจอ
   - ลากขึ้นไปได้ถึง 85%
   - ลากลงเพื่อปิดได้

3. **DebtorModal (70%, 90%)**
   - เปิดขึ้นมาที่ 70% ของหน้าจอ
   - ลากขึ้นไปได้ถึง 90%
   - ลากลงเพื่อปิดได้

### Gesture Controls

- **ลากลง** → ปิด BottomSheet
- **แตะ backdrop** → ปิด BottomSheet
- **ลากขึ้น** → ขยายไปยัง snap point ถัดไป

## การทดสอบ

### 1. **ทดสอบความสม่ำเสมอ**

- เปิด BottomSheet หลายครั้ง
- ตรวจสอบว่าขึ้นมาในตำแหน่งเดียวกัน

### 2. **ทดสอบ Gesture**

- ลากลงเพื่อปิด (iOS และ Android)
- แตะ backdrop เพื่อปิด
- ลากขึ้นเพื่อขยาย

### 3. **ทดสอบ Snap Points**

- ลากขึ้นไปยัง snap point ถัดไป
- ตรวจสอบว่าหยุดที่จุดที่ถูกต้อง

## หมายเหตุ

- การแก้ไขนี้ใช้ `@gorhom/bottom-sheet` library
- ต้องมี `GestureHandlerRootView` ใน root component
- Snap points ใช้ percentage ของหน้าจอ
- Backdrop มี opacity 50% เพื่อความเหมาะสม

หากยังมีปัญหาเกิดขึ้น กรุณาตรวจสอบว่า `GestureHandlerRootView` ได้ wrap ที่ root component แล้วหรือยัง
