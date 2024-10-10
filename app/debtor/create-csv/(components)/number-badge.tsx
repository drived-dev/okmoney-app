import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PARAGRAPH_BOLD } from "~/constants/Typography";
import { cn } from "~/lib/utils";

export const NumberBadge = ({ text }: { text: string }) => {
  return (
    <View>
      <View className="text-white w-10 h-10 bg-secondary rounded-full  flex justify-center items-center">
        <Text className={cn(PARAGRAPH_BOLD, "translate-y-[2px] text-white")}>
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
