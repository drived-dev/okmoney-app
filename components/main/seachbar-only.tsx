import { TextInput, View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input"; // Assuming you are using this component for a stylized input
import Toast from "react-native-toast-message";
import { Icon } from "../icon";

export function decodePhoneNumber(input: string) {
  // Convert phone number to usable data (logic to be added if needed)
  return input;
}

const SeachbarOnly = ({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (text: string) => void;
}) => {
  const formatPhoneNumber = (input: string | undefined) => {
    if (input === undefined) return input;

    if (input === "0") {
      // Show a toast notification for some input (optional behavior)
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Info",
        text2: "Number formatted!",
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
    <View className="flex flex-row gap-2 items-center rounded-xl bg-input px-5">
      <Icon name="Search" />
      <Input
        className="flex-1 bg-transparent border-transparent px-0"
        placeholder="ค้นหา" // Thai for "Search"
        value={value} // Format the value if needed
        onChangeText={onChangeText} // Correct prop for handling text changes
        maxLength={30}
      />
    </View>
  );
};

export default SeachbarOnly;
