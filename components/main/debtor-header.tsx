import React from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import { Phone } from "lucide-react-native";
import { cn } from "~/lib/utils";
import { LABEL, PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";

interface DebtorHeaderProps {
  profileImage: string;
  id: string;
  loanNumber: string;
  nickname: string;
  name: string;
  status: string;
  statusColorbg: string;
  statusColortxt: string;
  phoneNumber: string; // New prop for phone number
  isSwitchOn: boolean;
  handleCallPress: () => void;
  toggleSwitch: () => void;
}

const DebtorHeader: React.FC<DebtorHeaderProps> = ({
  profileImage,
  id,
  loanNumber,
  nickname,
  name,
  status,
  statusColorbg,
  statusColortxt,
  phoneNumber,
  isSwitchOn,
  handleCallPress,
  toggleSwitch,
}) => {
  return (
    <View className="flex flex-col gap-2">
      <View className="justify-between flex flex-row">
        <View className="flex-row items-center space-x-4">
          {/* Profile Image */}
          <Image
            source={{ uri: profileImage }}
            className="w-12 h-12 rounded-full"
          />
          {/* Loan Info */}
          <View>
            {loanNumber && (
              <Text className={cn(LABEL, "text-muted-foreground pl-2")}>
                เลขสัญญา {loanNumber}
              </Text>
            )}
            {/* Name: Bold nickname, gray full name */}
            <Text className={cn(PARAGRAPH, "pl-2 text-foreground ")}>
              {nickname + "  "}
              <Text className="text-muted-foreground font-ibm text-sm">
                {name}
              </Text>
            </Text>
          </View>
        </View>
        {/* Loan Status */}
        <View className="flex-row flex gap-2">
          <View className={`px-3 py-2 rounded-2xl self-start ${statusColorbg}`}>
            <Text
              className={cn(
                LABEL,
                `font-ibm-semibold text-destructive-foreground ${statusColortxt}`
              )}
            >
              {status}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-col gap-2">
        <TouchableOpacity
          onPress={handleCallPress}
          className="bg-[#F58737] px-4 py-3 rounded-3xl flex flex-row justify-between items-center"
        >
          <Phone color={"white"} size={16} />
          <Text className={cn(PARAGRAPH_BOLD, "text-background")}>
            {phoneNumber}
          </Text>
        </TouchableOpacity>
        <View className="bg-[#E7F7F6] px-4 py-3 rounded-3xl flex flex-row justify-between items-center">
          <Text className={cn(PARAGRAPH_BOLD, "text-foreground")}>
            ทวงหนี้อัตโนมัติ
          </Text>
          {/* Toggle Switch */}
          <Switch
            trackColor={{ false: "#767577", true: "#F58737" }}
            thumbColor={isSwitchOn ? "#F5F5F5" : "#F5F5F5"}
            onValueChange={toggleSwitch}
            value={isSwitchOn}
          />
        </View>
      </View>
    </View>
  );
};

export default DebtorHeader;
