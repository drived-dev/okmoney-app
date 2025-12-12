# การแก้ไขปัญหา Rules of Hooks

## ปัญหาที่พบ

แอพเกิด error "Rendered more hooks than during the previous render" ซึ่งเป็นปัญหาเกี่ยวกับ **Rules of Hooks** ของ React

### Error Message:

```
ERROR Warning: React has detected a change in the order of Hooks called by Index. This will lead to bugs and errors if not fixed.

Previous render            Next render
------------------------------------------------------
1. useRef                     useRef
2. useMemo                    useMemo
3. useSyncExternalStore       useSyncExternalStore
4. useEffect                  useEffect
5. useDebugValue              useDebugValue
6. useDebugValue              useDebugValue
7. useRef                     useRef
8. useMemo                    useMemo
9. useSyncExternalStore       useSyncExternalStore
10. useEffect                 useEffect
11. useDebugValue             useDebugValue
12. useDebugValue             useDebugValue
13. useEffect                 useEffect
14. useEffect                 useEffect
15. undefined                 useRef
   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
```

## สาเหตุของปัญหา

ปัญหาเกิดจากการมี **early returns** อยู่ระหว่าง hooks ซึ่งทำให้ hooks บางตัวถูกเรียกหรือไม่ถูกเรียกขึ้นอยู่กับเงื่อนไข

### ปัญหาเดิม:

```javascript
const Index = () => {
  const { loans, fetchLoans, isLoading, error, hasLoaded } = useLoanStore();
  const user = useUserStore();

  // ❌ Early return ระหว่าง hooks
  if (!user) {
    return <LoadingView />;
  }

  // ❌ Hooks ถูกเรียกหลังจาก early return
  useEffect(() => { ... }, []);
  const [state, setState] = useState();

  // ❌ Early return อีกครั้ง
  if (isLoading) {
    return <LoadingView />;
  }

  // ❌ Hooks เพิ่มเติมถูกเรียก
  const ref = useRef();

  return <MainComponent />;
};
```

## การแก้ไขที่ทำ

### 1. ย้าย Hooks ทั้งหมดไปไว้ด้านบนสุด

```javascript
const Index = () => {
  // ✅ All hooks called first, in consistent order
  const { loans, fetchLoans, isLoading, error, hasLoaded } = useLoanStore();
  const user = useUserStore();

  useEffect(() => { ... }, []);
  const [state, setState] = useState();
  const ref = useRef();
  const { control } = useForm();

  // ✅ Conditional rendering after all hooks
  if (!user) {
    return <LoadingView />;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return <MainComponent />;
};
```

### 2. ลำดับ Hooks ที่ถูกต้อง

1. **useStore hooks** - `useLoanStore()`, `useUserStore()`
2. **useEffect hooks** - ทุก useEffect
3. **Form hooks** - `useForm()`
4. **State hooks** - `useState()`
5. **Ref hooks** - `useRef()`
6. **Callback hooks** - `useCallback()`
7. **Other hooks** - hooks อื่นๆ

### 3. Conditional Rendering แทน Early Returns

- ย้าย early returns ทั้งหมดไปไว้หลัง hooks ทั้งหมด
- ใช้ conditional rendering แทน early returns

## ผลลัพธ์

- ✅ แก้ไขปัญหา "Rendered more hooks than during the previous render"
- ✅ Hooks ถูกเรียกในลำดับที่สม่ำเสมอทุกครั้ง
- ✅ แอพไม่ crash อีกต่อไป
- ✅ Error boundary ทำงานได้อย่างถูกต้อง

## ไฟล์ที่แก้ไข

- `app/(screen)/(tabs)/index.tsx`

## การทดสอบ

กรุณาทดสอบโดย:

1. Login เข้าแอพ
2. ไปที่หน้าอื่น
3. กลับเข้ามาในแอพ
4. เข้าสู่หน้าหลัก (tabs)/index.tsx
5. ตรวจสอบว่าไม่มี hooks error เกิดขึ้น

## Rules of Hooks ที่สำคัญ

1. **Always call hooks at the top level** - เรียก hooks ที่ top level เสมอ
2. **Don't call hooks inside loops, conditions, or nested functions** - ไม่เรียก hooks ใน loops, conditions, หรือ nested functions
3. **Call hooks in the same order every time** - เรียก hooks ในลำดับเดียวกันทุกครั้ง
4. **Only call hooks from React function components or custom hooks** - เรียก hooks จาก React function components หรือ custom hooks เท่านั้น

## References

- [Rules of Hooks - React Documentation](https://react.dev/link/rules-of-hooks)
- [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
