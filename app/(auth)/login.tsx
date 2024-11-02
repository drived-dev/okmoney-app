import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "~/lib/utils";
import {
  LABEL,
  PARAGRAPH,
  PARAGRAPH_BOLD,
  SUBHEADER,
  TITLE,
} from "~/constants/Typography";
import { IconButton } from "~/components/icon-button";
import { ArrowRight, Icon } from "lucide-react-native";
import { CONTAINER, GRID, GRID_ROW } from "~/constants/Styles";
import { useRouter } from "expo-router";
import PhoneInput from "~/components/phone-input";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ThemeToggle";
import { TouchableOpacity } from "react-native";

const index = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState("");
  // TODO: implement functionality
  return (
    <View className="h-full">
      <SafeAreaView>
        <ThemeToggle />
        <View className={cn(CONTAINER, "mt-20 mx-4")}>
          <View className="flex flex-col gap-8">
            <View className="flex flex-col">
              <Text className={cn(SUBHEADER, "text-foreground")}>
                เลือกช่องทาง{"\n"}การสมัคร/เข้าสู่ระบบ
              </Text>
            </View>
            <View />
            <View className="flex flex-col gap-3">
              <View className={cn(GRID)}>
                <Text className={cn(TITLE, "text-foreground")}>
                  เข้าร่วมผ่านเบอร์
                </Text>
                <PhoneInput value={phoneNumber} onChangeText={setPhoneNumber} />
                <Button onPress={() => router.push("/(tabs)/")}>
                  <Text className={cn(PARAGRAPH_BOLD, "text-background")}>
                    ต่อไป
                  </Text>
                </Button>
              </View>
              <View className="flex flex-row items-center gap-2">
                <View className="flex-1 h-px bg-gray-500"></View>
                <Text className={cn(LABEL, "text-gray-500")}>หรือ</Text>
                <View className="flex-1 h-px bg-gray-500"></View>
              </View>
              <View className="felx flex-col gap-4">
                <View className="felx flex-col gap-2">
                  <IconButton
                    icon={require("assets/images/line.png")}
                    text="เข้าร่วมผ่าน Line"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                  <IconButton
                    icon={require("assets/images/facebook.png")}
                    text="เข้าร่วมผ่าน Facebook"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                  <IconButton
                    icon={require("assets/images/google.png")}
                    text="เข้าร่วมผ่าน Google"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                </View>

                <Button variant={"link"}>
                  <Text className={cn(PARAGRAPH, "text-foreground underline")}>
                    ลืมรหัสผ่าน?
                  </Text>
                </Button>
              </View>
            </View>
            <View className="justify-center items-center flex flex-col mt-10">
              <View className="flex flex-row">
                <Text className={cn(PARAGRAPH, " text-gray-500")}>
                  การเข้าสู่ระบบแสดงว่าคุณยอมรับ
                </Text>
                <TouchableOpacity>
                  <Text className={cn(PARAGRAPH, " text-gray-500 underline")}>
                    นโยบายความเป็นส่วนตัว
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className={cn(PARAGRAPH, " text-gray-500")}>
                และข้อกำหนดการใช้งานของเรา
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default index;
