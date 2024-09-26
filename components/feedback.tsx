import { View, Text, TextProps } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import DoneLottie from "~/assets/lotties/done.json";
import { PARAGRAPH, SUBHEADER, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";

const Feedback = () => {
  return (
    <View className="h-full w-full justify-center items-center flex gap-2 -translate-y-20">
      <FeedbackTitle />
      <Success />
    </View>
  );
};

const Success = () => {
  return (
    <View className="">
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
    <Text
      className={cn("text-sm text-muted-foreground", SUBHEADER, className)}
      {...props}
    >
      {children}
    </Text>
  );
};
FeedbackTitle.displayName = "FeedbackTitle";

const FeedbackDescription = ({ className, children, ...props }: TextProps) => {
  return (
    <Text
      className={cn("text-sm text-muted-foreground", PARAGRAPH, className)}
      {...props}
    >
      {children}
    </Text>
  );
};
FeedbackDescription.displayName = "FeedbackDescription";

export default Feedback;
