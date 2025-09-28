import { View, Text, Alert } from "react-native";
import { router } from "expo-router";
import { IconButtonDrawer } from "~/components/icon-button-drawer";
import { User, Trash2 } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import useUserStore from "~/store/use-user-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HEADER, PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import { deleteUser } from "~/api/auth/delete-user";
export default function ProfileSettings() {
  const user = useUserStore();

  const handleDeleteAccount = async () => {
    const confirmDelete = new Promise((resolve) => {
      Alert.alert(
        "ยืนยันการลบบัญชี",
        "คุณแน่ใจหรือไม่ที่จะลบบัญชีผู้ใช้? การดำเนินการนี้ไม่สามารถย้อนกลับได้",
        [
          {
            text: "ยกเลิก",
            style: "cancel",
            onPress: () => resolve(false),
          },
          {
            text: "ลบบัญชี",
            style: "destructive",
            onPress: () => resolve(true),
          },
        ]
      );
    });

    const confirmed = await confirmDelete;

    if (confirmed) {
      const response = await deleteUser();
      try {
        if (response.status === 200) {
          user.setUser({ id: "" });
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("refreshToken");
          router.push("/(screen)/(tabs)");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className={cn(CONTAINER, "mx-2 h-full")}>
        <Text className={cn(PARAGRAPH_BOLD, "text-lg")}>
          ตั้งค่าบัญชีผู้ใช้
        </Text>
        <View className={cn("mt-4 flex flex-col flex-1 justify-between")}>
          <IconButtonDrawer
            variant="outline"
            icon={<User />}
            text="แก้ไขข้อมูลส่วนตัว"
            textClassName="w-56"
            size="xl"
            onPress={() => router.push("/profile/edit")}
          />
          <IconButtonDrawer
            variant="destructive"
            icon={<Trash2 />}
            text="ลบบัญชีผู้ใช้"
            textClassName="w-56 text-red-500"
            size="xl"
            onPress={handleDeleteAccount}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
