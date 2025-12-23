import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "~/components/ui/text";

export default function LoadingScreen() {
  const router = useRouter();

  // ตัวอย่าง: ถ้าต้องการให้หน้า Loading มีการ Redirect อัตโนมัติหลังจากเวลาผ่านไป
  // หรือจะลบออกถ้าหน้านี้ใช้เพื่อรอ Logic อื่นมาสั่งเปลี่ยนหน้าเอง
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);
  */

  return (
    <>
      {/* ซ่อน Header เพื่อให้ดูเหมือนหน้า Loading จริงๆ */}
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <View style={styles.content}>
          {/* ตัวหมุน Loading */}
          <ActivityIndicator size="large" color="#007AFF" />

          <Text style={styles.loadingText}>Loading, please wait...</Text>

          <Text style={styles.subText}>We are preparing things for you.</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
  },
});
