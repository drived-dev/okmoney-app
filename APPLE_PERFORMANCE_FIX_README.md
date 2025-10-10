# Apple App Store Performance Fix - การแก้ไข Apple App Store Performance Issue

## ปัญหาที่เกิดขึ้น

**Guideline 2.1 - Performance - App Completeness**

Apple พบ 2 bugs หลักที่ส่งผลกระทบต่อผู้ใช้:

1. **Error message displayed when we attempted to create new account with Apple and Google**
2. **Error message displayed when we access into 'ลูกหนี้' feature**

## สาเหตุหลัก

### 1. **Social Login (Apple/Google) Errors**

- **Syntax Error** - มี syntax error ใน `social-login-button.tsx`
- **Insufficient Error Handling** - ไม่มีการแสดง error message ให้ผู้ใช้
- **Missing Error States** - ไม่มีการจัดการ error states ต่างๆ

### 2. **Debtor Feature Errors**

- **Network Error Handling** - ไม่มีการจัดการ network errors อย่างเหมาะสม
- **API Error Messages** - Error messages ไม่เป็นมิตรกับผู้ใช้
- **Missing Error Boundaries** - ไม่มี error boundary สำหรับ debtor feature

## วิธีแก้ไขที่ได้ทำ

### 1. แก้ไข Social Login Errors

#### A. แก้ไข Syntax Error ใน `social-login-button.tsx`

**เดิม:**

```typescript
const signInWithSocial = async () =>
  try {
    // ... code
  } catch (error) {
    // ... error handling
  }
;
```

**ใหม่:**

```typescript
const signInWithSocial = async () => {
  try {
    // ... code
  } catch (error) {
    // ... error handling
  }
};
```

#### B. เพิ่ม Error Handling และ Toast Messages

```typescript
// เพิ่ม Toast import
import Toast from "react-native-toast-message";

// เพิ่ม error handling ใน signInWithSocial
if (result.type === "success") {
  await handleRedirect({ url: result.url });
} else if (result.type === "cancel") {
  console.log("User cancelled authentication");
} else {
  // Show error message to user
  Toast.show({
    type: "error",
    position: "bottom",
    text1: "เกิดข้อผิดพลาด",
    text2: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง",
  });
}
```

#### C. ปรับปรุง handleRedirect Function

```typescript
const handleRedirect = async (event: { url: string }) => {
  try {
    const parsedUrl = Linking.parse(event.url);
    const { queryParams } = parsedUrl;

    const { token, refreshToken, userId, error } = queryParams || {};

    // Check for error in URL parameters
    if (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "เกิดข้อผิดพลาด",
        text2: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองอีกครั้ง",
      });
      return;
    }

    // ... rest of the function with better error handling
  } catch (error) {
    // ... comprehensive error handling
  }
};
```

### 2. แก้ไข Debtor Feature Errors

#### A. ปรับปรุง Loan Store Error Handling

```typescript
fetchLoans: async () => {
  set({ isLoading: true, error: null });
  try {
    const loans = await getLoanAll();
    const parsedLoans = parseLoansDatas(loans);
    set({ loans: parsedLoans, error: null });
  } catch (error: any) {
    console.error('Failed to fetch loans:', error);
    let errorMessage = 'ไม่สามารถโหลดข้อมูลลูกหนี้ได้';

    if (error.response?.status === 401) {
      errorMessage = 'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่';
    } else if (error.response?.status === 403) {
      errorMessage = 'ไม่มีสิทธิ์เข้าถึงข้อมูล';
    } else if (error.response?.status >= 500) {
      errorMessage = 'เซิร์ฟเวอร์มีปัญหา กรุณาลองอีกครั้งภายหลัง';
    } else if (error.code === 'NETWORK_ERROR' || !error.response) {
      errorMessage = 'ไม่สามารถเชื่อมต่ออินเทอร์เน็ตได้';
    }

    set({ error: errorMessage });
  } finally {
    set({ isLoading: false });
  }
},
```

#### B. ปรับปรุง Error UI ใน Debtor Feature

```typescript
// Show error state
if (error) {
  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="items-center justify-center bg-red-50 rounded-2xl p-6 mx-4">
        <Text className="text-red-600 text-center mb-4 font-medium text-lg">
          เกิดข้อผิดพลาด
        </Text>
        <Text className="text-red-500 text-center mb-6">{error}</Text>
        <Button onPress={fetchLoans} className="bg-red-500">
          <Text className="text-white font-medium">ลองอีกครั้ง</Text>
        </Button>
      </View>
    </View>
  );
}
```

#### C. สร้าง DebtorErrorBoundary

```typescript
// components/DebtorErrorBoundary.tsx
class DebtorErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: any) {
    console.error("DebtorErrorBoundary caught an error:", error, errorInfo);

    Alert.alert(
      "เกิดข้อผิดพลาดในฟีเจอร์ลูกหนี้",
      "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง",
      [
        {
          text: "รีเฟรชข้อมูล",
          onPress: this.handleRefresh,
        },
        {
          text: "กลับหน้าหลัก",
          onPress: this.handleGoHome,
        },
      ]
    );
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    const { fetchLoans } = useLoanStore.getState();
    fetchLoans();
  };
}
```

#### D. ปรับปรุง API Error Handling

```typescript
// api/loans/get-loan-all.ts
export async function getLoanAll() {
  try {
    const response = await api.get("/debtor/mydebtors");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching debtors:", error);

    // Enhance error with more context
    const enhancedError = new Error(error.message || "Failed to fetch debtors");
    enhancedError.response = error.response;
    enhancedError.code = error.code;

    throw enhancedError;
  }
}
```

## ข้อดีของการแก้ไข

### 1. **Social Login Stability**

- แก้ไข syntax error ที่ทำให้เกิด crash
- เพิ่ม error messages ที่เป็นมิตรกับผู้ใช้
- จัดการ error states ต่างๆ อย่างครบถ้วน

### 2. **Debtor Feature Reliability**

- Error messages ที่เข้าใจง่าย
- Error boundary ที่จับ JavaScript errors
- Network error handling ที่ครอบคลุม

### 3. **User Experience**

- แสดง error messages เป็นภาษาไทย
- มีปุ่มให้ผู้ใช้ลองใหม่
- Error UI ที่สวยงามและใช้งานง่าย

### 4. **Developer Experience**

- Error logging ที่ดีขึ้น
- Error handling ที่เป็นระบบ
- Code ที่ maintainable

## การทดสอบ

### 1. **ทดสอบ Social Login**

- ลองเข้าสู่ระบบด้วย Apple
- ลองเข้าสู่ระบบด้วย Google
- ทดสอบการยกเลิกการเข้าสู่ระบบ
- ทดสอบ network error

### 2. **ทดสอบ Debtor Feature**

- เข้าไปในฟีเจอร์ลูกหนี้
- ทดสอบ network error
- ทดสอบ server error
- ทดสอบ error boundary

### 3. **ทดสอบ Error Recovery**

- ทดสอบการรีเฟรชข้อมูล
- ทดสอบการกลับหน้าหลัก
- ทดสอบการลองใหม่

## ไฟล์ที่แก้ไข

1. `app/(auth)/(components)/social-login-button.tsx` - แก้ไข syntax error และเพิ่ม error handling
2. `store/use-loan-store.ts` - ปรับปรุง error handling และ error messages
3. `app/(screen)/(tabs)/index.tsx` - ปรับปรุง error UI และเพิ่ม error boundary
4. `api/loans/get-loan-all.ts` - ปรับปรุง API error handling
5. `components/DebtorErrorBoundary.tsx` - สร้าง error boundary ใหม่

## หมายเหตุ

1. **ต้อง Rebuild** - ต้อง build แอพใหม่เพื่อให้การเปลี่ยนแปลงมีผล
2. **Test on Device** - ทดสอบบนอุปกรณ์จริงเพื่อดู error handling
3. **App Store Connect** - ส่งแอพใหม่ไปยัง App Store Connect
4. **Review Process** - Apple จะตรวจสอบ bugs ที่แก้ไขแล้ว

การแก้ไขนี้ควรผ่านการตรวจสอบ Apple App Store Review แล้วครับ!
