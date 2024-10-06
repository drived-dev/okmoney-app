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

export const CustomDrawer = () => {
  return (
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
              <TouchableOpacity>
                <View
                  className={cn(
                    ROW,
                    "bg-[#E7F7F6] flex flex-row py-4 px-4 rounded-2xl"
                  )}
                >
                  <Icon name="User" />
                  <Text>เเก้ไขข้อมูลของคุณ</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  className={cn(
                    ROW,
                    "bg-[#E7F7F6] flex flex-row py-4 px-4 rounded-2xl"
                  )}
                >
                  <Icon name="Mail" />
                  <Text>เพิ่มช่องทางกู้ข้อมูล</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View className="flex flex-col gap-2">
              <TouchableOpacity>
                <View
                  className={cn(
                    ROW,
                    "bg-[#E7F7F6] flex flex-row py-4 px-4 rounded-2xl"
                  )}
                >
                  <Icon name="Phone" />
                  <Text>ติดต่อ support</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View
                  className={cn(
                    ROW,
                    "bg-[#E7F7F6] flex flex-row py-4 px-4 rounded-2xl"
                  )}
                >
                  <Icon name="MessageCircle" />
                  <Text>ให้ feedback</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
