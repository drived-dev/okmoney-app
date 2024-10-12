import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AvatarText } from "./avatar-text";
import { Image, View } from "react-native";
import { CONTAINER, FORM, ROW } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import ProgressText from "./progress-text";
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "./icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "./icon-button";
import { Mail, MessageCircle, Phone, User } from "lucide-react-native";
import { IconButtonDrawer } from "./icon-button-drawer";

export const CustomDrawer = () => {
  return (
    <View className="h-full pb-10">
      <SafeAreaView className="">
        <View className={cn(CONTAINER, "mx-2")}>
          <View className={cn(FORM, "")}>
            <AvatarText url="https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"></AvatarText>
            <Text className={cn(PARAGRAPH, "")}>sms ที่ใช้ไปแล้ว</Text>
            <ProgressText
              textStart="7 ครั้ง"
              textEnd="20 ครั้ง"
              percentage={35}
            />
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
              }}
              className="w-full h-40 object-cover rounded-2xl"
            ></Image>
            <View className="flex flex-col ">
              <View className="flex flex-col gap-2">
                <IconButtonDrawer
                  variant="green"
                  icon={<User />}
                  text="เเก้ไขข้อมูลของคุณ"
                  textClassName="w-56"
                  size={"xl"}
                />

                <IconButtonDrawer
                  variant="green"
                  icon={<Mail />}
                  text="เพิ่มช่องทางกู้ข้อมูล"
                  textClassName="w-56"
                  size={"xl"}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View className={cn(CONTAINER, "mt-auto px-4 flex flex-col")}>
        <View className="flex flex-col gap-2">
          <IconButtonDrawer
            variant="green"
            icon={<Phone />}
            text="ติดต่อ support"
            textClassName="w-56"
            size={"xl"}
          />
          <IconButtonDrawer
            variant="green"
            icon={<MessageCircle />}
            text="ให้ feedback"
            textClassName="w-56"
            size={"xl"}
          />
        </View>
      </View>
    </View>
  );
};
