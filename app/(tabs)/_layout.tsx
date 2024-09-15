// import Colors from "~/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const routes = [
  {
    name: "index",
    tabBarLabel: "Home",
    icon: (props: any) => <FontAwesome5 name="home" {...props} />,
  },
  // {
  //   name: "explore",
  //   tabBarLabel: "Explore",
  //   icon: (props: any) => <FontAwesome5 name="search" {...props} />,
  // },
  // {
  //   name: "trips",
  //   tabBarLabel: "Trips",
  //   icon: (props: any) => <FontAwesome5 name="map" {...props} />,
  // },
];

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.red[400] }}>
      {routes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarLabel: route.tabBarLabel,
            tabBarIcon: route.icon,
          }}
        />
      ))}
    </Tabs>
  );
};

export default Layout;
