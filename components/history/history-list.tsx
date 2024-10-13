import { View, Text } from "react-native";
import React from "react";
import { AvatarText } from "../avatar-text";
import { cn } from "~/lib/utils";
import { LABEL, PARAGRAPH } from "~/constants/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "../icon-button";
import { Icon } from "../icon";

export const Historylist = () => {
  return (
    <View className="m-3">
      <View className="flex flex-row justify-between">
        <View className="flex flex-row items-center">
          <Avatar alt="Zach Nugent's Avatar" className="w-12 h-12">
            <AvatarImage
              source={{
                uri: "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
              }}
            />
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>

          <Text className={cn(PARAGRAPH, "pl-2 ")}>
            ธาม{" "}
            <Text className="text-muted-foreground font-ibm text-sm">
              สมพง นักบิด
            </Text>
          </Text>
        </View>
        <View className="flex flex-col gap-2 items-center">
          <View className="bg-[#E7F7F6] pt-3 pb-2 px-3 rounded-xl flex flex-row items-center gap-1">
            <Text className={cn(PARAGRAPH, "text-sm text-muted-foreground")}>
              เงินโอน
            </Text>
            <Icon name="ArrowLeftRight" size={16} color="gray" />
          </View>
          <Text className={cn(LABEL, "")}>1000 บาท</Text>
        </View>
      </View>
    </View>
  );
};
