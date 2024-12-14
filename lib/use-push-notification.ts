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
    console.log("Starting registerForPushNotificationsAsync");
    let token;
    if (true) {
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
        alert("Failed to get push token for push notification");
        return;
      }

      console.log("Getting Expo push token");
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      });
      console.log("Received push token:", token);
    } else {
      console.log("Not a physical device");
      alert("Must be using a physical device for Push notifications");
    }

    if (Platform.OS === "android") {
      console.log("Setting up Android notification channel");
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  useEffect(() => {
    console.log("Setting up notification listeners");

    registerForPushNotificationsAsync().then((token) => {
      console.log("Setting push token:", token);
      setExpoPushToken(token);
    });

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
