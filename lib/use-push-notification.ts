import { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import Constants from "expo-constants";

import { Platform } from "react-native";

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
  console.log("Initializing usePushNotifications hook");

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    try {
      console.log("Starting registerForPushNotificationsAsync");
      let token;

      // Check if running on a physical device
      if (!Device.isDevice) {
        console.log("Not a physical device, skipping push notification setup");
        return undefined;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      console.log("Existing notification permission status:", existingStatus);
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        console.log("Requesting notification permissions");
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log("New permission status:", status);
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get notification permissions");
        // Don't show alert, just log
        // alert("Failed to get push token for push notification");
        return undefined;
      }

      // Get projectId with fallback
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        console.warn(
          "EAS project ID not found, skipping push token registration"
        );
        return undefined;
      }

      console.log("Getting Expo push token with projectId:", projectId);
      token = await Notifications.getExpoPushTokenAsync({
        projectId: projectId,
      });
      console.log("Received push token:", token);

      if (Platform.OS === "android") {
        console.log("Setting up Android notification channel");
        try {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
          });
        } catch (channelError: any) {
          console.error(
            "Error setting up notification channel:",
            channelError?.message || channelError
          );
        }
      }

      return token;
    } catch (error: any) {
      console.error(
        "Error in registerForPushNotificationsAsync:",
        error?.message || error
      );
      // Don't throw error, just return undefined
      return undefined;
    }
  }

  useEffect(() => {
    console.log("Setting up notification listeners");

    (async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        console.log("Setting push token:", token);
        setExpoPushToken(token);
      } catch (error: any) {
        console.error(
          "Error setting up push notifications:",
          error?.message || error
        );
        // Don't crash the app if push notification setup fails
      }
    })();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Received notification:", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
      });

    return () => {
      console.log("Cleaning up notification listeners");
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};
