import { View, Text } from "react-native";
import React, { useEffect } from "react";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";

const index = () => {
  const user = useUserStore();

  useEffect(() => {
    user.setUser({ id: "" });
    router.navigate("/(auth)/index");
  }, []);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;
