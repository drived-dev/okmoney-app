import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { IconButton } from "~/components/icon-button";
import { Button, SafeAreaView, View, Image } from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "~/store/use-user-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, TITLE } from "~/constants/Typography";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const router = useRouter();
  const { setUser, accessToken, refreshToken } = useUserStore();

  const BACKEND_AUTH_URL = "http://localhost:3000/api/auth/google/login";

  const handleButtonClick = () => {
    signInWithGoogle();
  };

  useEffect(() => {
    // Listen for any incoming links when app is open
    const subscription = Linking.addEventListener("url", (event) => {
      handleRedirect({ url: event.url });
    });

    return () => subscription.remove();
  }, []);

  const handleRedirect = async (event: { url: string }) => {
    try {
      const parsedUrl = Linking.parse(event.url);
      const { queryParams } = parsedUrl;

      const { token, refreshToken, userId } = queryParams || {};

      if (token && refreshToken) {
        setUser({
          id: userId as string,
        });
        await AsyncStorage.setItem("token", token as string);
        await AsyncStorage.setItem("refreshToken", refreshToken as string);
        router.push("/profile"); // Navigate to Profiles page after authentication
      } else {
        console.error("[Debug] No tokens in URL:", event.url);
      }
    } catch (error) {
      console.error("[Debug] Redirect Error:", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Create and log the redirect URI
      const redirectUri = Linking.createURL("auth/google");
      console.log(redirectUri);

      // Log the full auth URL being opened
      const authUrl = `${BACKEND_AUTH_URL}?redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
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
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex-col flex h-full")}>
        <View className="flex flex-col flex-1 gap-20">
          <View className="flex flex-col gap-2 mt-20">
            <View className="justify-center w-full flex flex-row">
              <Text className={cn(TITLE, "text-foreground")}>
                ติดตามข่าวสาร Ok money ผ่าน
              </Text>
            </View>
            <View className="justify-center w-full flex flex-row">
              <Text className={cn(TITLE, "text-foreground")}>LINE OA</Text>
            </View>
          </View>
          <View className="flex flex-row -gap-4 justify-center py-8">
            <Image source={require("assets/images/line_oa.png")} />
          </View>
        </View>
        <View className="mt-auto justify-center items-center">
          <IconButton
            icon={require("assets/images/google.png")}
            text="Sign in with Google (Demo)"
            variant="green"
            size={"xl"}
            textClassName="flex-1"
            onPress={handleButtonClick} // Directly navigate to profiles on success
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
