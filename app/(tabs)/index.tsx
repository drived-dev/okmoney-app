import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, TITLE, BUTTON } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

const Index = () => {
  return (
    <View className="">
      <Text className={cn(TITLE)}>hello world สวัสดี</Text>

      <Text className={cn(TITLE, "text-primary")}>hello world สวัสดี</Text>

      <Button size="lg" className="mb-2">
        <Text>hello world สวัสดี</Text>
      </Button>

      <Button size="sm">
        <Text>hello world สวัสดี</Text>
      </Button>
      <View className="bg-secondary w-20 h-20"></View>
      <ThemeToggle />
    </View>
  );
};

export default Index;
