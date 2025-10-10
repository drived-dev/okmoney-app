import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "~/components/custom-drawer";
import useUserStore from "~/store/use-user-store";
import { router } from "expo-router";

const Layout = () => {
  const user = useUserStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure user store is fully loaded
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  // Show loading while initializing
  if (isInitializing) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
          กำลังโหลด...
        </Text>
      </View>
    );
  }

  // Check if user is logged in
  if (user.id === "") {
    // Redirect to login instead of showing login screen directly
    router.replace("/(auth)/login");
    return null;
  }

  return (
    <Drawer
      drawerContent={() => <CustomDrawer />}
      screenOptions={({ route }) => ({
        drawerType: "front",
        headerShown: false,
        swipeEnabled: route.name !== "(tabs)/index",
      })}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Drawer>
  );
};

export default Layout;
