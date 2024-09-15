import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";

const Index = () => {
  return (
    <View>
      <Text className={cn(TITLE)}>hello world สวัสดี</Text>

      <Text className={cn(TITLE, "text-primary")}>hello world สวัสดี</Text>

      <View className="bg-secondary w-20 h-20"></View>
      <ThemeToggle />
    </View>
  );
};

export default Index;
