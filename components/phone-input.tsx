import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import Toast from "react-native-toast-message";

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ onChangeText, value, ...props }, ref) => {
  const [countryCode, setCountryCode] = React.useState("66");

  function prettifyPhoneNumber(input: string | undefined) {
    if (value == undefined) return input;

    const removeCountryCode = input?.replace(`+${countryCode}`, "");
    let cleaned = removeCountryCode?.replace(/^0/, "");
    const match = cleaned?.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return cleaned;
  }

  function formatToE164(phoneNumber: string, countryCode: string) {
    // Remove any non-numeric characters from the phone number
    const cleanedNumber = phoneNumber.replace(/[^0-9+]/g, "");

    // Check if the number starts with a zero, as in local formats
    if (cleanedNumber.startsWith("0")) {
      // TODO: change info text
      Toast.show({
        type: "info",
        position: "bottom",
        text1: "กรุณากรอกเบอร์โทรศัพท์",
        text2: "เบอร์โทรศัพท์ต้องมีความยาว 9 หลัก",
      });

      // Remove the leading zero and prepend the country code
      return `+${countryCode}${cleanedNumber.substring(1)}`;
    } else {
      // If countryCode is already infront
      if (cleanedNumber.startsWith(`+${countryCode}`)) {
        return cleanedNumber;
      }

      // If the number doesn't start with zero, return it as is with country code
      return `+${countryCode}${cleanedNumber}`;
    }
  }

  function change(input: string) {
    if (input.length > 9) {
      return;
    }

    onChangeText!(formatToE164(input, countryCode));
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className="flex gap-2 flex-row items-stretch">
        <CountryDropdown
          countryCode={countryCode}
          setCountryCode={setCountryCode}
        />
        <View className="flex-1 flex-row gap-2 items-center rounded-2xl bg-input px-5">
          <Input
            className="flex-1 bg-transparent border-transparent px-0"
            placeholder="เบอร์โทรศัพท์"
            value={prettifyPhoneNumber(value)}
            onChangeText={change}
            ref={ref}
            keyboardType="phone-pad"
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
});

interface CountryDropdownProps {
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
}

const CountryDropdown = ({
  countryCode,
  setCountryCode,
}: CountryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="outline flex flex-row gap-1">
          <Text className={cn(PARAGRAPH, "scale-125")}>🇹🇭 </Text>
          <Text className={cn(PARAGRAPH)}>+{countryCode}</Text>
          <ChevronDown color="black" size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel>ประเทศ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row justify-between">
          <Text className={cn(PARAGRAPH)}>🇹🇭 ไทย</Text>
          <Text className={cn(PARAGRAPH)}> +{countryCode}</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PhoneInput;
