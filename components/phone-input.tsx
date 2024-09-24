import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import { set } from "react-hook-form";
import Toast from "react-native-toast-message";

const PhoneInput = () => {
  const [value, setValue] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("66");

  const formatPhoneNumber = (input) => {
    if (input == "0") {
      // TODO: change info text
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "Hello",
        text2: "This is some something 👋",
      });
    }
    const cleaned = input.replace(/^0/, "");
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return cleaned;
  };

  const handleOnChangeText = (text) => {
    setValue(formatPhoneNumber(text));
  };

  return (
    <View className="flex gap-2 flex-row items-stretch">
      <CountryDropdown />
      <View className="flex-1 flex-row gap-2 items-center rounded-xl border border-input bg-background px-5">
        <Text className={cn(PARAGRAPH_BOLD)}>+{countryCode}</Text>
        <Input
          className="flex-1 bg-transparent border-transparent px-0"
          placeholder="เบอร์โทรศัพท์"
          value={value}
          onChangeText={handleOnChangeText}
        />
      </View>
    </View>
  );
};

const CountryDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="outline flex flex-row gap-2">
          <Text className={cn(PARAGRAPH, "scale-125")}>🇹🇭</Text>
          <ChevronDown color="black" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel>ประเทศ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row justify-between">
          <Text className={cn(PARAGRAPH)}>🇹🇭 ไทย</Text>
          <Text className={cn(PARAGRAPH)}> +66</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default PhoneInput;

const styles = StyleSheet.create({});
