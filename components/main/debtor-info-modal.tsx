import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  Linking,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { IconButton } from "../icon-button";
import { FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../ui/input";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";
import { NotebookPen, Phone, X } from "lucide-react-native";
import { cn } from "~/lib/utils";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/button";
import { AvatarText } from "../avatar-text";
import Toast from "react-native-toast-message";
import useEditingLoanStore from "~/store/use-editing-loan-store";
import { LABEL } from "~/constants/Typography";

const statusColorsbg: Record<string, string> = {
  ค้างชำระ: "bg-red-500", // Overdue
  ครบชำระ: "bg-gray-200", // Paid
  รอชำระ: "bg-blue-500", // Pending
  ใกล้กำหนด: "bg-yellow-500", // Canceled
};

const statusColorstxt: Record<string, string> = {
  ค้างชำระ: "text-destructive-foreground", // Overdue
  ครบชำระ: "text-gray-600", // Paid
  รอชำระ: "text-destructive-foreground", // Pending
  ใกล้กำหนด: "text-destructive-foreground", // Canceled
};

const DebtorModal = forwardRef((propTypes, bottomSheetModalRef) => {
  const { id, profileImage, name, nickname, status, removeId } =
    useEditingLoanStore();

  const statusColorbg = statusColorsbg[status] || "bg-blue-500";
  const statusColortxt = statusColorstxt[status] || "text-textb";

  // Add a state for the toggle switch
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const toggleSwitch = () => setIsSwitchOn((previousState) => !previousState);

  // Function to initiate phone call
  const handleCallPress = () => {
    Linking.openURL("tel:0635395419");
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} style={styles.shadow}>
      <BottomSheetView style={styles.contentContainer}>
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
                <Text className={cn(LABEL, "text-muted-foreground pl-2")}>
                  เลขสัญญา {id}
                </Text>
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
              <View
                className={`px-3 py-2 rounded-2xl self-start ${statusColorbg}`}
              >
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
                063-539-5419
              </Text>
            </TouchableOpacity>
            <View className="bg-[#E7F7F6] px-4 py-3 rounded-3xl flex flex-row justify-between items-center">
              <Text className={cn(PARAGRAPH, "text-foreground")}>
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
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow opacity (0 - 1 range)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    minHeight: 680,
    gap: 16,
    padding: 20,
    width: "100%",
  },
});

export default DebtorModal;
