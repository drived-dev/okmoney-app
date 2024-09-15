import { Link } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, TITLE, BUTTON } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
const Index = () => {
  return (
    <View className="">
      <LinearGradient
        colors={["#F3D791", "#DF9C59", "#FD954B"]}
        start={{ x: 1, y: -0.4 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradientBackground}
      />

      <SafeAreaView>
        <Text>hello world สวัสดี</Text>
        <View
          className={cn(CONTAINER, "mt-4 bg-white h-full rounded-3xl pt-5")}
        >
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
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 200,
  },
});
