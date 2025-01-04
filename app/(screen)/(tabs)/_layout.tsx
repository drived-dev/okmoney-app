// import Colors from "~/constants/Colors";
import { Redirect, router, Tabs } from "expo-router";
import React from "react";
import { PieChart, User, File } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { useColorScheme } from "~/lib/useColorScheme";
import { Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import useUserStore from "~/store/use-user-store";
import LoginScreen from "../../(auth)/login";

interface Route {
  name: string;
  tabBarLabel: string;
  icon: (props: any) => JSX.Element;
}

const routes: Route[] = [
  {
    name: "dashboard",
    tabBarLabel: "แดชบอร์ด",
    icon: (props) => <PieChart size={20} {...props} />,
  },
  {
    name: "index",
    tabBarLabel: "ลูกหนี้",
    icon: (props) => <User size={20} {...props} />,
  },
  {
    name: "history",
    tabBarLabel: "ประวัติ",
    icon: (props) => <File size={20} {...props} />,
  },
];

const Layout = () => {
  const softShadow = {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
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
          backgroundColor: colors.white,
          height: 86,
          paddingTop: 8,
          ...softShadow,
        },
        tabBarActiveTintColor: colors.red[500],
        tabBarInactiveTintColor: colors.gray[400],
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.white,
        },
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
