// import Colors from "~/constants/Colors";
import { Tabs } from "expo-router";
import React from "react";
import { PieChart, User, File } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { Platform } from "react-native";

const routes = [
  {
    name: "index",
    tabBarLabel: "แดชบอร์ด",
    icon: (props: any) => <PieChart size={20} {...props} />,
  },
  {
    name: "dashboard",
    tabBarLabel: "ลูกหนี้",
    icon: (props: any) => <User size={20} {...props} />,
  },
  {
    name: "history",
    tabBarLabel: "ประวัติ",
    icon: (props: any) => <File size={20} {...props} />,
  },
];

const Layout = () => {
  const softShadow = {
    ...Platform.select({
      ios: {
        shadowColor: "#000", // Set shadow color
        shadowOffset: {
          width: 0,
          height: -6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 9,
      },
      android: {
        elevation: 14,
      },
    }),
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 86,
          paddingTop: 8,
          ...softShadow,
        },
        tabBarActiveTintColor: colors.red[500],
        tabBarInactiveTintColor: colors.gray[400],
      }}
    >
      {routes.map((route) => (
        <Tabs.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarLabel: route.tabBarLabel,
            tabBarIcon: route.icon,
            tabBarLabelStyle: {
              fontFamily: "IBMPlex-Medium",
              fontSize: 12,
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default Layout;
