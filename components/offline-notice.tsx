import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useNetInfo from "~/lib/useNetInfo";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Info } from "lucide-react-native";

const OfflineNotice = () => {
  const isConnected = useNetInfo();

  if (isConnected) {
    return null;
  }

  return (
    <View className="bg-red-600 flex flex-row gap-4 items-center justify-center py-2">
      <MaterialIcons name="signal-wifi-off" size={20} color="white" />
      <View className="flex items-center flex-row gap-2 justify-center ">
        <Text className={cn(PARAGRAPH_BOLD, "text-white")}>
          ขาดการเชื่อมต่อ
        </Text>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Info color={"#fafafa"} size={16} />
          </TooltipTrigger>
          <TooltipContent>
            <Text className={cn(PARAGRAPH, "native:text-lg")}>
              บางฟีเจอร์อาจไม่สามารถใช้งานได้
            </Text>
          </TooltipContent>
        </Tooltip>
      </View>
    </View>
  );
};

export default OfflineNotice;
