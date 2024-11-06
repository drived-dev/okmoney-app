import { ArrowLeft, MoveLeft, SkipBack, WifiOff } from "lucide-react-native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useNetInfo from "~/lib/useNetInfo";
import { cn } from "~/lib/utils";
import colors from "tailwindcss/colors";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { Button } from "./ui/button";
import { router } from "expo-router";
import { IconButton } from "./icon-button";
// Higher-order component that conditionally renders the wrapped component based on connectivity
const OnlineOnly = (WrappedComponent: React.ComponentType) => {
  const OnlineOnlyComponent: React.FC = (props) => {
    const isConnected = useNetInfo();

    const handleBack = () => {
      if (router.canGoBack()) {
        // If there's a previous page, go back
        router.back();
      } else {
        // Otherwise, navigate to a fallback route (e.g., "Home")
        router.navigate("/");
      }
    };

    if (!isConnected) {
      return (
        <View className="flex flex-col gap-4 items-center justify-center py-2 flex-1">
          <WifiOff color={colors.gray[500]} size={64} />
          <Text className={cn(TITLE, "text-gray-400")}>
            no internet connection
          </Text>
          <IconButton
            icon={<ArrowLeft />}
            onPress={handleBack}
            text="go back"
          ></IconButton>
        </View>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return OnlineOnlyComponent;
};

const styles = StyleSheet.create({
  offlineContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  offlineText: {
    fontSize: 18,
    color: "#333",
  },
});

export default OnlineOnly;
