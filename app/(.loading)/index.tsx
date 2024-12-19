import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";
import { useRootNavigationState, Redirect } from "expo-router";

const index = () => {
  const rootNavigationState = useRootNavigationState();

  const user = useUserStore();

  useEffect(() => {
    if (!rootNavigationState?.key) return;
    console.log("user.id", user.id);
    if (user.id === "") {
      router.push("/(auth)/login");
    } else {
      router.push("/(screen)/dashboard");
    }
  }, [rootNavigationState?.key]);

  return (
    <View className="flex-1 items-center justify-center h-full">
      <Image
        source={require("assets/images/placeholder.png")}
        className="w-20 h-20"
      />
    </View>
  );
};

export default index;
