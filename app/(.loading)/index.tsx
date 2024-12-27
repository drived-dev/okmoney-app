import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";
import { useRootNavigationState, Redirect } from "expo-router";

const index = () => {
  const rootNavigationState = useRootNavigationState();
  const user = useUserStore();

  if (!rootNavigationState?.key) return null;

  if (user.id === "") {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(screen)/dashboard" />;
};

export default index;
