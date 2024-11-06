import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { IconButton } from "~/components/icon-button";
import { View } from "react-native";

export default function GoogleAuth() {
  // Your backend URL that initiates the Google OAuth flow
  const BACKEND_AUTH_URL =
    "https://okmoney-bk.vercel.app/api/auth/google/login";

  useEffect(() => {
    // Set up deep link listener
    const subscription = Linking.addEventListener("url", handleRedirect);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleRedirect = async (event: { url: string }) => {
    // Parse the URL to get any query parameters or tokens
    const data = Linking.parse(event.url);

    // Access query parameters from the redirect URL
    const { queryParams } = data;
    const { token, userId, error } = queryParams || {};

    if (error) {
      console.error("Authentication error:", error);
      return;
    }

    if (token && userId) {
      // Handle successful authentication
      console.log("Received auth data:", { token, userId });
      // Store tokens, update auth state, etc.
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Add state parameter to help verify the redirect
      const state = Math.random().toString(36).substring(7);
      // Create and encode a redirect URI that the OAuth provider will call back to
      // Linking.createURL generates a deep link URL for the app (e.g. exp://192.168.1.1:19000/auth/callback)
      // encodeURIComponent ensures the URL is properly encoded for use as a query parameter
      const redirectUri = encodeURIComponent(
        Linking.createURL("auth/callback")
      );

      console.log("redirectUri", redirectUri);

      // Add any additional parameters you want your backend to return
      const authUrl = `${BACKEND_AUTH_URL}?redirect_uri=${redirectUri}&state=${state}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        Linking.createURL("auth/callback")
      );

      if (result.type === "success") {
        // The authentication flow completed, but actual auth data
        // will be handled by the handleRedirect function
        console.log("Auth flow completed");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
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
