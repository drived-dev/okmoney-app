import { View, Text, TextProps, ViewProps } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import DoneLottie from "~/assets/lotties/done.json";
import { PARAGRAPH, SUBHEADER, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CommonActions } from "@react-navigation/native";
import { Href, useRouter } from "expo-router";

interface FeedbackProps extends ViewProps {
  isSuccess?: boolean;
  redirect?: boolean;
  redirectUrl?: string;
  redirectTimer?: number;
}

// TODO: auto redirect after frame ended
const Feedback = ({
  children,
  className,
  isSuccess = true,
  redirect = false,
  redirectUrl = "/",
  redirectTimer = 1000,
  ...props
}: FeedbackProps) => {
  const router = useRouter();

  const navigateToScreen = (redirectUrl: Href<string | object>) => {
    router.dismissAll();
    router.push(redirectUrl as Href<string | object>);
  };

  React.useState(() => {
    if (redirect) {
      setTimeout(() => {
        navigateToScreen(redirectUrl as Href<string | object>);
      }, redirectTimer);
    }
  });

  return (
    <View
      className={cn(
        "h-full w-full justify-center items-center flex -translate-y-20",
        className
      )}
      {...props}
    >
      {children}
      {isSuccess ? <Success /> : <Error />}
    </View>
  );
};

const Error = () => {
  return <View></View>;
};

const Success = () => {
  return (
    <View>
      <LottieView
        style={{ width: 200, height: 200 }}
        source={DoneLottie}
        autoPlay
        loop={false}
      />
    </View>
  );
};

const FeedbackTitle = ({ className, children, ...props }: TextProps) => {
  return (
    <Text className={cn(SUBHEADER, className)} {...props}>
      {children}
    </Text>
  );
};
FeedbackTitle.displayName = "FeedbackTitle";

const FeedbackDescription = ({ className, children, ...props }: TextProps) => {
  return (
    <Text className={cn(PARAGRAPH, className)} {...props}>
      {children}
    </Text>
  );
};
FeedbackDescription.displayName = "FeedbackDescription";

export { Feedback, FeedbackTitle, FeedbackDescription };
