import { View, Text } from "react-native";
import React from "react";
import { AvatarText } from "../avatar-text";
import { cn } from "~/lib/utils";
import { LABEL, PARAGRAPH } from "~/constants/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "../icon-button";
import { Icon } from "../icon";
import { Eye } from "lucide-react-native";

// Define the props interface
interface HistorylistProps {
  url?: string; // URL for the image
  nickname?: string; // Nickname for the user, optional
  name: string; // Full name of the user
  variant: "cash" | "create" | "payment"; // Variant type to determine the content
  value: string | number; // Amount or value to be displayed
  slip?: string; // Optional slip image URL for payment variant
}

export const Historylist: React.FC<HistorylistProps> = ({
  url,
  nickname,
  name,
  variant,
  slip,
  value,
}) => {
  // Helper function to generate fallback initials
  const getInitials = () => {
    if (nickname && nickname.length >= 2) {
      return nickname.slice(0, 2).toUpperCase();
    } else if (name && name.length >= 2) {
      return name.slice(0, 2).toUpperCase();
    }
    return "??"; // Fallback if no valid nickname or name
  };

  // Determine variant text and icon
  const getVariantDetails = () => {
    switch (variant) {
      case "cash":
        return { text: "เงินสด", icon: "HandCoins" };
      case "create":
        return { text: "สร้างลูกหนี้ใหม่", icon: null }; // No icon for create
      case "payment":
        return { text: "เงินโอน", icon: "ArrowLeftRight" };
      default:
        return { text: "", icon: null };
    }
  };

  const { text: variantText, icon: variantIcon } = getVariantDetails();

  // Determine what to display in the text block (nickname or name if nickname is absent)
  const displayName = nickname ? nickname : name;

  return (
    <View className="m-3">
      <View className="flex flex-col">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <Avatar alt={`${name}'s Avatar`} className="w-12 h-12">
              <AvatarImage
                source={{
                  uri: url,
                }}
              />
              <AvatarFallback>
                <Text>{getInitials()}</Text>
              </AvatarFallback>
            </Avatar>

            {/* Display name or nickname */}
            <Text className={cn(PARAGRAPH, "pl-2")}>
              {displayName}
              {/* Show muted name only if nickname exists */}
              {nickname && (
                <Text className="text-muted-foreground font-ibm text-sm">
                  {" "}
                  {name}
                </Text>
              )}
            </Text>
          </View>
          <View className="flex flex-col gap-2 items-center">
            {/* Variant block */}
            {variant && (
              <View className="bg-[#E7F7F6] pt-3 pb-2 px-3 rounded-xl flex flex-row items-center gap-1">
                <Text
                  className={cn(PARAGRAPH, "text-sm text-muted-foreground")}
                >
                  {variantText}
                </Text>
                {variantIcon && (
                  <Icon name={variantIcon} size={16} color="gray" />
                )}
              </View>
            )}
            {/* Display the value prop */}
            <Text className={cn(LABEL, "")}>{value} บาท</Text>
          </View>
        </View>

        {/* Conditionally show payment slip if variant is "payment" and slip is provided */}
        {variant === "payment" && slip && (
          <View className="flex flex-row justify-between ml-4 gap-2">
            <Icon name="CornerDownRight" />
            <IconButton
              icon={<Eye />}
              text="ดูหลักฐานการโอนเงิน"
              iconPosition="right"
              variant="outline"
              className="flex-1"
              onPress={() => console.log("Viewing slip:", slip)}
            />
          </View>
        )}
      </View>
    </View>
  );
};
