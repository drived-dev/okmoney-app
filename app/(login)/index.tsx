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
import { ArrowRight } from "lucide-react-native";
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
                  <View
                    className={cn(
                      ROW,
                      "bg-green-200 rounded-xl items-center py-4"
                    )}
                  >
                    <Image
                      source={{
                        uri: "https://www.google.co.th/url?sa=i&url=https%3A%2F%2Fth.wikipedia.org%2Fwiki%2F%25E0%25B9%2584%25E0%25B8%259F%25E0%25B8%25A5%25E0%25B9%258C%3ALINE_New_App_Icon_%25282020-12%2529.png&psig=AOvVaw0XNT7aNgD9s4_TCz6S0wm3&ust=1728486360143000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjIv86H_4gDFQAAAAAdAAAAABAE",
                      }}
                      className="w-8 h-8"
                    />
                    <View className="flex justify-center">
                      <Text className={cn(PARAGRAPH_BOLD, "")}>
                        เข้าร่วมผ่าน Line
                      </Text>
                    </View>
                  </View>

                  <View
                    className={cn(
                      ROW,
                      "bg-green-200 rounded-xl items-center py-4"
                    )}
                  >
                    <Image
                      source={{
                        uri: "https://www.google.co.th/url?sa=i&url=https%3A%2F%2Fth.wikipedia.org%2Fwiki%2F%25E0%25B9%2584%25E0%25B8%259F%25E0%25B8%25A5%25E0%25B9%258C%3ALINE_New_App_Icon_%25282020-12%2529.png&psig=AOvVaw0XNT7aNgD9s4_TCz6S0wm3&ust=1728486360143000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjIv86H_4gDFQAAAAAdAAAAABAE",
                      }}
                      className="w-8 h-8"
                    />
                    <View className="flex justify-center">
                      <Text className={cn(PARAGRAPH_BOLD, "")}>
                        เข้าร่วมผ่าน Facebook
                      </Text>
                    </View>
                  </View>
                  <View
                    className={cn(
                      ROW,
                      "bg-green-200 rounded-xl items-center py-4"
                    )}
                  >
                    <Image
                      source={{
                        uri: "https://www.google.co.th/url?sa=i&url=https%3A%2F%2Fth.wikipedia.org%2Fwiki%2F%25E0%25B9%2584%25E0%25B8%259F%25E0%25B8%25A5%25E0%25B9%258C%3ALINE_New_App_Icon_%25282020-12%2529.png&psig=AOvVaw0XNT7aNgD9s4_TCz6S0wm3&ust=1728486360143000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKjIv86H_4gDFQAAAAAdAAAAABAE",
                      }}
                      className="w-8 h-8"
                    />
                    <View className="flex flex-row justify-center">
                      <Text className={cn(PARAGRAPH_BOLD, "")}>
                        เข้าร่วมผ่าน Google
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="justify-center items-center">
                  <Text className={cn(PARAGRAPH, "text-foreground")}>
                    ลืมรหัสผ่าน?
                  </Text>
                </View>
              </View>
            </View>
            <View className="justify-center items-center flex flex-col mt-5">
              <Text className={cn(PARAGRAPH, " text-gray-500")}>
                การเข้าสู่ระบบแสดงว่าคุณยอมรับนโยบายความเป็นส่วนตัว
              </Text>
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
