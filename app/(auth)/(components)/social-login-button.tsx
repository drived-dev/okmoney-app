import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { IconButton } from "~/components/icon-button";
import {
  Button,
  SafeAreaView,
  View,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "~/store/use-user-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { getUser } from "~/api/auth/get-user";

WebBrowser.maybeCompleteAuthSession();

interface SocialLoginButtonProps {
  icon: string;
  text: string;
  type: "google" | "line";
}

export default function SocialLoginButton({
  icon,
  text,
  type,
}: SocialLoginButtonProps) {
  const router = useRouter();
  const { setUser, accessToken, refreshToken } = useUserStore();

  const BACKEND_AUTH_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth/${type}/login`;

  // useEffect(() => {
  //   // Listen for any incoming links when app is open
  //   const subscription = Linking.addEventListener("url", (event) => {
  //     handleRedirect({ url: event.url });
  //   });

  //   return () => subscription.remove();
  // }, []);

  const handleRedirect = async (event: { url: string }) => {
    try {
      const parsedUrl = Linking.parse(event.url);
      const { queryParams } = parsedUrl;

      const { token, refreshToken, userId } = queryParams || {};
      if (token && refreshToken) {
        // set token and refresh token to async storage
        await AsyncStorage.setItem("token", token as string);
        await AsyncStorage.setItem("refreshToken", refreshToken as string);

        const response = await getUser();
        const userData = response.data;
        // If user already exists, set the user data
        if (userData.storeName !== null && userData.storeName !== "") {
          setUser(userData);
          return router.push("/(screen)/(tabs)");
        } else {
          setUser({
            id: userId as string,
          });
        }

        router.push("/(screen)/profile/create"); // Navigate to Profiles page after authentication
      } else {
        console.error("[Debug] No tokens in URL:", event.url);
      }
    } catch (error) {
      console.error("[Debug] Redirect Error:", error);
    }
  };

  const signInWithSocial = async () => {
    try {
      // Create and log the redirect URI
      const redirectUri = Linking.createURL(`auth/${type}`);
      console.log(redirectUri);

      // Log the full auth URL being opened
      const authUrl = `${BACKEND_AUTH_URL}?redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri,
        {
          showInRecents: true,
          dismissButtonStyle: "cancel",
          // preferEphemeralSession: true,
        }
      );

      // Handle the WebBrowser result
      if (result.type === "success") {
        await handleRedirect({ url: result.url });
      }
    } catch (error) {
      console.error("[Debug] Sign in Error:", error);
    }
  };

  return (
    <IconButton
      icon={icon}
      text={text}
      variant="green"
      size={"xl"}
      textClassName="flex-1"
      onPress={signInWithSocial} // Directly navigate to profiles on success
    />
  );
}
