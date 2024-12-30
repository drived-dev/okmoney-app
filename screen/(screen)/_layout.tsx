import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "~/components/custom-drawer";
import useUserStore from "~/store/use-user-store";
import LoginScreen from "../(auth)/login";
import { useRootNavigationState } from "expo-router";

const Layout = () => {
  const rootNavigationState = useRootNavigationState();
  const user = useUserStore();

  if (!rootNavigationState?.key) return null;

  // push to login screen if user is not logged in
  if (user.id === "") {
    return <LoginScreen />;
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
