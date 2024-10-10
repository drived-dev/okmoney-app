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
import { CONTAINER, FORM, ROW } from "~/constants/Styles";
import { useRouter } from "expo-router";
import PhoneInput from "~/components/phone-input";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ThemeToggle";

const index = () => {
  const router = useRouter();
  return (
    <View className="h-full">
      <SafeAreaView>
        <ThemeToggle />
        <View className={cn(CONTAINER, "mt-32 mx-4")}>
          <View className="flex flex-col gap-8">
            <View className="flex flex-col">
              <Text className={cn(SUBHEADER, "text-foreground")}>
                เลือกช่องทาง
              </Text>
              <Text className={cn(SUBHEADER, "text-foreground")}>
                การสมัคร/เข้าสู่ระบบ
              </Text>
            </View>
            <View />
            <View className="flex flex-col gap-4">
              <View className={cn(FORM, "")}>
                <Text className={cn(TITLE, "text-foreground")}>
                  เข้าร่วมผ่านเบอร์
                </Text>
                <PhoneInput />
                <Button>
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
                    icon={
                      "https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png"
                    }
                    text="เข้าร่วมผ่าน Line"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                  <IconButton
                    icon={
                      "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                    }
                    text="เข้าร่วมผ่าน Facebook"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                  <IconButton
                    icon={
                      "https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png"
                    }
                    text="เข้าร่วมผ่าน Google"
                    variant="green"
                    size={"xl"}
                    textClassName="flex-1"
                  ></IconButton>
                </View>

                <View className="justify-center items-center">
                  <Text className={cn(PARAGRAPH, "text-foreground underline")}>
                    ลืมรหัสผ่าน?
                  </Text>
                </View>
              </View>
            </View>
            <View className="justify-center items-center flex flex-col mt-5">
              <View className="flex flex-row">
                <Text className={cn(PARAGRAPH, " text-gray-500")}>
                  การเข้าสู่ระบบแสดงว่าคุณยอมรับ
                </Text>
                <Text className={cn(PARAGRAPH, " text-gray-500 underline")}>
                  นโยบายความเป็นส่วนตัว
                </Text>
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
