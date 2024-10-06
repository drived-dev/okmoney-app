import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CONTAINER, FORM, ROW } from "~/constants/Styles";
import { AvatarText } from "~/components/avatar-text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import PhoneInput from "~/components/phone-input";
import { Icon } from "~/components/icon";
import { IconButton } from "~/components/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "mt-20 flex flex-col gap-80 mx-4")}>
        <View className="flex flex-col gap-5">
          <Text className={cn(TITLE, "")}>ข้อมูลร้านค้า</Text>
          <View className="flex flex-col gap-12">
            <View className="flex flex-col items-center justify-center gap-2">
              <AvatarText url="https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"></AvatarText>
              <Button variant={"ghost"}>
                <Text className={cn(PARAGRAPH, "")}>เปลี่ยนโปรไฟล์</Text>
              </Button>
            </View>
            <View className={cn(FORM, "")}>
              <View className="flex flex-col gap-2">
                <Text>ชื่อผู้ใช้</Text>
                <Input
                  placeholder="ชื่อผู้ใช้งาน"
                  keyboardType="ascii-capable"
                  maxLength={20}
                />
              </View>
              <View className="flex flex-col gap-2">
                <View className={cn(ROW, "items-center")}>
                  <Text>เบอร์โทร</Text>
                  <Icon name="Info" size={16}></Icon>
                </View>
                <PhoneInput></PhoneInput>
              </View>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <IconButton
            icon={<ArrowLeft />}
            size={"icon-lg"}
            className="items-center justify-center"
            variant="ghost"
            onPress={() => router.back()}
          />
          <IconButton
            icon={<ArrowRight />}
            text="ต่อไป"
            iconPosition="right"
            size={"lg"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
