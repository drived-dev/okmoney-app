import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import CloseButton from "~/components/close-button";
import { Slot } from "expo-router";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import OnlineOnly from "~/components/online-only";
const Layout = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View className={cn(CONTAINER, "flex flex-col gap-5 h-full")}>
        <CloseButton />

        <View className="flex-col gap-2">
          <Text className={cn(TITLE)}>สร้างลูกหนี้่จำนวนมาก</Text>
          <Text className={cn(PARAGRAPH)}>สร้างลูกหนี้หลายคนพร้อมกัน</Text>
        </View>

        <Slot />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default OnlineOnly(Layout);
