import { Link, Stack, usePathname } from "expo-router"; // เพิ่ม usePathname
import { View, StyleSheet } from "react-native";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  // ดึงค่า path ที่ผู้ใช้พิมพ์เข้ามาแล้วไม่เจอ
  const pathname = usePathname();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <Text style={styles.title}>404 - Not Found</Text>

        {/* ส่วนที่แสดงว่าผู้ใช้พยายามจะไปหน้าไหน */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>You tried to visit:</Text>
          <Text style={styles.pathText}>{pathname}</Text>
        </View>

        <Text style={styles.message}>
          The page you are looking for does not exist.
        </Text>

        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ef4444", // สีแดงเตือน
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 5,
  },
  pathText: {
    fontSize: 16,
    color: "#212529",
    fontWeight: "600",
    fontFamily: "monospace", // ทำให้ดูเหมือน path/code
  },
  message: {
    fontSize: 16,
    color: "#495057",
    textAlign: "center",
    marginBottom: 30,
  },
  link: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  linkText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
