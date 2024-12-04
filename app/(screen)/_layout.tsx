import { View, Text } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "~/components/custom-drawer";
import useUserStore from "~/store/use-user-store";
import LoginScreen from "../(auth)/login";
const Layout = () => {
  const user = useUserStore();
  // if (user.id === "") {
  //   return <LoginScreen />;
  // }
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
