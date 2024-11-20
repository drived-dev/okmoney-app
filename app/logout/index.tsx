import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const user = useUserStore();

  useEffect(() => {
    user.setUser({ id: "" });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");

    router.navigate("/(auth)/index");
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
