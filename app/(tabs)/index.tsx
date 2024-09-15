import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TEXT_STYLE } from "~/constants/Styles";
const Index = () => {
  return (
    <View>
      <Text className={`${TEXT_STYLE.paragraph}`}>hello world</Text>
    </View>
  );
};

export default Index;
