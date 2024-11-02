import React from "react";
import { StyleSheet, View, Text, ViewProps } from "react-native";
import { LABEL, PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";

interface DebtorNameProps extends ViewProps {
  name: string;
  nickname?: string;
}

export const DebtorName = ({
  name,
  nickname,
  className,
  ...props
}: DebtorNameProps) => {
  const names = [];
  names.push(name);
  names.push(nickname);

  return (
    <View className={cn(className, "flex flex-row gap-2 items-center")}>
      <Text className={cn(PARAGRAPH, "")}>{names[0]}</Text>
      <Text className={cn(LABEL, "text-gray-500")}>{names[1] || ""}</Text>
    </View>
  );
};
