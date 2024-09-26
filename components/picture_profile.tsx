import { View, Text, Image } from "react-native";
import React from "react";

export const Picture_profile = ({ url }) => {
  return (
    <View>
      <Image source={{ uri: url }} className="w-12 h-12 rounded-full" />
    </View>
  );
};
