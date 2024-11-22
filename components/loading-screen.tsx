import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import LoadingLottie from "~/assets/lotties/loading.json";

const LoadingScreen = () => {
  return (
    <View className="h-full w-full justify-center items-center flex">
      <LottieView
        style={{ width: 150, height: 150 }}
        source={LoadingLottie}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingScreen;
