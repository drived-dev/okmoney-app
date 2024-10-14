import { Text, TextInput, View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import Toast from "react-native-toast-message";
import { Icon } from "../icon";

export function decodePhoneNumber(input: string) {
  // TODO: turn phone number to usable data
  return input;
}

const Seachbaronly = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ onChange, value, ...props }, ref) => {
  const [countryCode, setCountryCode] = React.useState("66");

  const formatPhoneNumber = (input: string | undefined) => {
    if (value == undefined) return input;

    if (input == "0") {
      // TODO: change info text
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Hello",
        text2: "This is some something 👋",
      });
    }

    const cleaned = input?.replace(/^0/, "");
    const match = cleaned?.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return cleaned;
  };

  return (
    <View className="flex gap-2 flex-row items-stretch">
      <View className="flex-1 flex-row gap-2 items-center rounded-xl  bg-input px-5">
        <Icon name="Search"></Icon>
        <Input
          className="flex-1 bg-transparent border-transparent px-0"
          placeholder="ค้นหา"
          value={formatPhoneNumber(value)}
          keyboardType="default"
          maxLength={30}
          {...props}
        />
      </View>
    </View>
  );
});

export default Seachbaronly;
