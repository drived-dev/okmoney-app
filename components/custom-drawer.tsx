import React from "react";
import { DrawerItem } from "@react-navigation/drawer";
import { router } from "expo-router";

export const CustomDrawer = () => {
  return (
    <>
      <DrawerItem
        label={"home"}
        onPress={() => router.push("/(drawer)/(tabs)")}
      />
    </>
  );
};
