import { Text, TextInput, View } from "react-native";
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

export function decodePhoneNumber(input: string) {
  // TODO: turn phone number to usable data
  return input;
}

const PhoneInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput>
>(({ onChange, value, ...props }, ref) => {
  const [countryCode, setCountryCode] = React.useState("66");

  const formatPhoneNumber = (input: string) => {
    const cleaned = input?.replace(/^0/, ""); // Clean leading 0
    const match = cleaned.match(/^(\d{2})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return input;
  };

  return (
    <View className="flex gap-2 flex-row items-stretch">
      <CountryDropdown />
      <View className="flex-1 flex-row gap-2 items-center rounded-xl bg-input px-5">
        <Text className={cn(PARAGRAPH_BOLD)}>+{countryCode}</Text>
        <Input
          ref={ref}
          className="flex-1 bg-transparent border-transparent px-0"
          placeholder="เบอร์โทรศัพท์"
          value={value} // Keep the raw input value for typing
          onChangeText={(text) => onChange(text)} // Update the form with the raw value
          onBlur={() => onChange(formatPhoneNumber(value))} // Format on blur using the value directly, not the event
          keyboardType="phone-pad"
          maxLength={9} // Adjust based on phone number length
          {...props}
        />
      </View>
    </View>
  );
});

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
