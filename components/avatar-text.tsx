import { View, Text, ViewProps } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "~/lib/utils";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
interface AvatarText extends ViewProps {
  url?: string;
  title?: string;
  children?: JSX.Element;
}
export const AvatarText = ({
  url,
  title = "สวัสดี",
  children,
  className,
  ...props
}: AvatarText) => {
  return (
    <View className={cn(className, "flex flex-row gap-2")} {...props}>
      <Avatar alt="Zach Nugent's Avatar" className="w-12 h-12">
        <AvatarImage source={{ uri: url }} />
        <AvatarFallback>
          <Text>ZN</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex flex-col gap-1">
        <Text className={cn(PARAGRAPH, "")}>{title}</Text>
        {children}
      </View>
    </View>
  );
};
