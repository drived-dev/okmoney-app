import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TEXT_STYLE } from "~/constants/Styles";
import { cn } from "~/lib/utils";
const Index = () => {
  return (
    <View>
      <Text className={cn(TEXT_STYLE.paragraph)}>hello world สวัสดี</Text>
    </View>
  );
};

export default Index;
