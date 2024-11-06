import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Button, Platform, TouchableOpacity } from "react-native";
import { NAV_THEME } from "~/constants/Colors";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { Drawer } from "expo-router/drawer";
import { CustomDrawer } from "~/components/custom-drawer";
import OfflineNotice from "~/components/offline-notice";
import { toastConfig } from "~/components/toast-config";
import useUserStore from "~/store/use-user-store";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  const [fontsLoaded] = useFonts({
    "IBMPlex-Regular": require("../assets/fonts/IBMPlexSansThai-Regular.ttf"),
    "IBMPlex-Medium": require("../assets/fonts/IBMPlexSansThai-Medium.ttf"),
    "IBMPlex-SemiBold": require("../assets/fonts/IBMPlexSansThai-SemiBold.ttf"),
  });

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }

      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    // <NavigationContainer independent={true}>
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Drawer
        drawerContent={() => <CustomDrawer />}
        initialRouteName={"(tabs)"}
        screenOptions={{
          drawerType: "front",
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Drawer>
      <OfflineNotice />
      <Toast config={toastConfig} />
      <PortalHost />
    </ThemeProvider>
    // </NavigationContainer>
  );
}
