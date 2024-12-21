import { View, Text, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AvatarText } from "../avatar-text";
import { cn } from "~/lib/utils";
import { LABEL, PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IconButton } from "../icon-button";
import { Icon } from "../icon";
import { Eye, X } from "lucide-react-native"; // Importing 'X' for the close icon

// Define the props interface
interface HistorylistProps {
  url?: string;
  nickname?: string;
  name: string;
  variant: string;
  value: string | number;
  slip?: string;
}

export const Historylist: React.FC<HistorylistProps> = ({
  url,
  nickname,
  name,
  variant,
  slip,
  value,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const getInitials = () => {
    if (nickname && nickname.length >= 2) {
      return nickname.slice(0, 2).toUpperCase();
    } else if (name && name.length >= 2) {
      return name.slice(0, 2).toUpperCase();
    }
    return "??";
  };

  const getVariantDetails = () => {
    switch (variant) {
      case "CASH":
        return { text: "เงินสด", icon: "HandCoins" };
      case "EXISTING":
        return { text: "สร้างลูกหนี้ใหม่", icon: null };
      case "TRANSFER":
        return { text: "เงินโอน", icon: "ArrowLeftRight" };
      default:
        return { text: "", icon: null };
    }
  };

  const { text: variantText, icon: variantIcon } = getVariantDetails();
  const displayName = nickname ? nickname : name;

  return (
    <View className="m-3">
      <View className="flex flex-col">
        <View className="flex flex-row justify-between">
          <View className="flex flex-row items-center">
            <Avatar alt={`${name}'s Avatar`} className="w-14 h-14">
              <AvatarImage
                source={{
                  uri: url,
                }}
              />
              <AvatarFallback>
                <Text>{getInitials()}</Text>
              </AvatarFallback>
            </Avatar>
            <Text className={cn(PARAGRAPH, "pl-2")}>
              {displayName}
              {nickname && (
                <Text className="text-muted-foreground font-ibm text-sm">
                  {name}
                </Text>
              )}
            </Text>
          </View>
          <View className="flex flex-col gap-1 items-center">
            {variant && (
              <View className="bg-[#E7F7F6] pt-3 pb-2 px-3 rounded-xl flex flex-row items-center gap-1">
                <Text
                  className={cn(
                    PARAGRAPH_BOLD,
                    "text-sm text-muted-foreground"
                  )}
                >
                  {variantText}
                </Text>
                {variantIcon && (
                  <Icon name={variantIcon} size={16} color="gray" />
                )}
              </View>
            )}
            <Text className={cn(LABEL, "")}>{value} บาท</Text>
          </View>
        </View>

        {slip && (
          <View className="flex flex-row justify-between ml-4 gap-2">
            <Icon name="CornerDownRight" />
            <IconButton
              icon={<Eye />}
              text="ดูหลักฐานการโอนเงิน"
              iconPosition="right"
              variant="outline"
              className="flex-1"
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
      </View>

      {/* Modal with a transparent background */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View
            style={{
              width: "90%",
              height: "70%",
              backgroundColor: "white",
              borderRadius: 10,
              overflow: "hidden",
              padding: 10,
              position: "relative", // Needed to position the close icon
            }}
          >
            {/* Close (X) icon at the top right */}
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1,
              }}
              onPress={() => setModalVisible(false)}
            >
              <X size={24} color="black" />
            </TouchableOpacity>

            <Image
              // source={{ uri: slip }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
                borderRadius: 10,
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
