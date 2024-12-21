import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { AvatarText } from "./avatar-text";
import { Image, View } from "react-native";
import { CONTAINER, GRID } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import ProgressText from "./progress-text";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import { Icon } from "./icon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "./icon-button";
import { LogOut, Mail, MessageCircle, Phone, User } from "lucide-react-native";
import { IconButtonDrawer } from "./icon-button-drawer";
import useUserStore from "~/store/use-user-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CustomDrawer = () => {
  const user = useUserStore();
  return (
    <View className="h-full pb-10">
      <SafeAreaView className="">
        <View className={cn(CONTAINER, "mx-2")}>
          <View className={cn(GRID, "")}>
            {/* TODO: user image */}
            <AvatarText url={user.profileImage as string} title="สวัสดี">
              <Text
                className={cn(PARAGRAPH_BOLD, "text-lg translate-y-[-6px]")}
              >
                {user.storeName}
              </Text>
            </AvatarText>
            <View>
              <Text className={cn(PARAGRAPH, "")}>sms ที่ใช้ไปแล้ว</Text>
              <ProgressText
                textStart={`${user.smsUsed} ครั้ง`}
                textEnd={`${user.smsAvailable} ครั้ง`}
                percentage={(user.smsUsed / user.smsAvailable) * 100}
              />
            </View>
            <TouchableOpacity onPress={() => router.push("/package")}>
              <Image
                source={require("assets/images/promo.png")}
                className="w-full h-40 object-cover rounded-2xl"
              ></Image>
            </TouchableOpacity>
            <View className="flex flex-col ">
              <View className="flex flex-col gap-2">
                <IconButtonDrawer
                  variant="green"
                  icon={<User />}
                  text="เเก้ไขข้อมูลของคุณ"
                  textClassName="w-56"
                  size={"xl"}
                  onPress={() => router.push("/profile/edit")}
                />

                {/* <IconButtonDrawer
                  variant="green"
                  icon={<Mail />}
                  text="เพิ่มช่องทางกู้ข้อมูล"
                  textClassName="w-56"
                  size={"xl"}
                /> */}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View className={cn(CONTAINER, "mt-auto px-4 flex flex-col")}>
        <View className="flex flex-col gap-2">
          {/* TODO: contact support button */}
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
          <IconButtonDrawer
            variant="destructive"
            icon={<LogOut />}
            onPress={() => {
              user.setUser({ id: "" });
              AsyncStorage.removeItem("token");
              AsyncStorage.removeItem("refreshToken");
              router.push("/(screen)/(tabs)");
            }}
            text="ออกจากระบบ"
            textClassName="w-56 text-red-500"
            size={"xl"}
          />
        </View>
      </View>
    </View>
  );
};
