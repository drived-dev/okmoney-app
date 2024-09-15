import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
const Index = () => {
  return (
    <View>
      <Text className={cn(TITLE)}>hello world สวัสดี</Text>
    </View>
  );
};

export default Index;
