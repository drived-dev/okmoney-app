import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { IconButton } from "~/components/icon-button";
import { Button, View } from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "~/store/use-user-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const router = useRouter();
  const { setUser, accessToken, refreshToken } = useUserStore();

  const BACKEND_AUTH_URL = "http://localhost:3000/api/auth/google/login";

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

      const { token, refreshToken } = queryParams || {};

      if (token && refreshToken) {
        setUser({
          accessToken: accessToken as string,
          refreshToken: refreshToken as string,
        });
        AsyncStorage.setItem("token", token as string);
        AsyncStorage.setItem("refreshToken", refreshToken as string);
        router.push("/(tabs)");
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
    } catch (error) {}
  };

  return (
    <View className="flex-1 justify-center items-center">
      <IconButton
        icon={require("assets/images/google.png")}
        text="Sign in with Google"
        variant="green"
        size={"xl"}
        textClassName="flex-1"
        onPress={signInWithGoogle}
      />
    </View>
  );
}
