import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { IconButton } from "~/components/icon-button";
import { View } from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "~/store/use-user-store";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleAuth() {
  const router = useRouter();
  const BACKEND_AUTH_URL = "http://localhost:3000/api/auth/google/login";

  // useEffect(() => {
  //   // Set up deep link listener
  //   const subscription = Linking.addEventListener("url", handleRedirect);
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  useEffect(() => {
    // Handle initial URL if app was opened from a link
    // Linking.getInitialURL().then((url) => {
    //   console.log("[Debug] Initial URL:", url);
    //   console.log("url", url);
    //   if (url) {
    //     handleRedirect({ url });
    //   }
    // });

    // Listen for any incoming links when app is open
    const subscription = Linking.addEventListener("url", (event) => {
      console.log("[Debug] Incoming URL:", event.url);
      handleRedirect({ url: event.url });
    });

    return () => subscription.remove();
  }, []);

  const handleRedirect = async (event: { url: string }) => {
    const { setUser } = useUserStore.getState();
    try {
      // Parse the full URL
      const parsedUrl = Linking.parse(event.url);
      const { queryParams } = parsedUrl;

      const { token, refreshToken } = queryParams || {};

      if (token && refreshToken) {
        setUser({
          accessToken: token,
          refreshToken: refreshToken,
        });
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
        redirectUri,
        {
          showInRecents: true,
          preferEphemeral: true,
          dismissButtonStyle: "done",
        }
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
