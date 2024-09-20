import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";

const FormStepper = () => {
  return (
    <View>
      <Text className={cn(TITLE)}></Text>
    </View>
  );
};

export default FormStepper;

const styles = StyleSheet.create({});
