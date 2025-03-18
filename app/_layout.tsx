import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack, Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Alert, Button, Platform, TouchableOpacity } from "react-native";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginScreen from "./(auth)/login";
import Purchases from "react-native-purchases";
// import { usePushNotifications } from "~/lib/use-push-notification";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  // const { expoPushToken, notification } = usePushNotifications();
  // console.log(expoPushToken);
  // console.log("Hee");

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

  // Configure
  React.useEffect(() => {
    if (Platform.OS === "ios") {
      if (!process.env.EXPO_PUBLIC_RC_IOS) {
        Alert.alert(
          "Error configure RC ",
          "RevenueCat API KEY for the ios is not provide"
        );
      } else {
        Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_IOS });
      }
    } else if (Platform.OS === "android") {
      if (!process.env.EXPO_PUBLIC_RC_ANDROID) {
        Alert.alert(
          "Error configure RC ",
          "RevenueCat API KEY for the Android is not provide"
        );
      } else {
        Purchases.configure({ apiKey: process.env.EXPO_PUBLIC_RC_ANDRIOD });
      }
    }
    Purchases.getOfferings().then(console.log);
  }, []);

  ////Config

  if (!isColorSchemeLoaded) {
    return null;
  }

  if (!fontsLoaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
        gcTime: 1000 * 60 * 30, // Unused data is garbage collected after 30 minutes
        retry: 2, // Number of times to retry failed queries
        refetchOnWindowFocus: false, // Disable automatic refetch on window focus
      },
    },
  });

  return (
    // <NavigationContainer independent={true}>
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
        initialRouteName="(auth)/index"
      >
        {/* <Stack.Screen
          name="(.loading)"
          options={{
            headerShown: false,
          }}
        /> */}
        <Stack.Screen
          name="(screen)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(auth)/index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <OfflineNotice />
      <Toast config={toastConfig} />
      <PortalHost />
    </QueryClientProvider>
  );
}
