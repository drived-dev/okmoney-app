import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";
import { useRootNavigationState, Redirect } from "expo-router";
import { getUser } from "~/api/auth/get-user";

const index = () => {
  const rootNavigationState = useRootNavigationState();
  const user = useUserStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const fetchUserData = async () => {
      console.log("user.id", user.id);

      if (user.id === "") {
        router.push("/(auth)/login");
      } else {
        try {
          const response = await getUser();
          const userData = response.data;
          setUser(userData);
          console.log("User data fetched and saved successfully");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
        router.push("/(screen)/dashboard");
      }
    };

    fetchUserData();
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
