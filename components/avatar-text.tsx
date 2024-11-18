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
  className?: string;
  textClassName?: string;
  placeholder?: string;
}
export const AvatarText = ({
  url,
  title,
  children,
  className,
  placeholder = "OK",
  textClassName,
  ...props
}: AvatarText) => {
  return (
    <View className={cn(className, "flex flex-row gap-2")} {...props}>
      <Avatar alt="Zach Nugent's Avatar" className="w-12 h-12">
        <AvatarImage source={{ uri: url }} />
        <AvatarFallback>
          <Text className={cn(PARAGRAPH, "text-foreground")}>
            {placeholder.slice(0, 2)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex flex-col">
        <Text className={cn(PARAGRAPH, textClassName)}>{title}</Text>
        {children}
      </View>
    </View>
  );
};
