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
  ScrollView,
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
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import LoanDetails from "./loan-detail";
import DebtorHeader from "./debtor-header";
import AdditionalInfo from "./debtor-footer";

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

  // Add a state for the toggle switch
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const phoneNumber = "063-539-5419";

  // Toggle Switch Handler
  const toggleSwitch = () => setIsSwitchOn((previousState) => !previousState);

  // Function to initiate a phone call
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <BottomSheetModal ref={bottomSheetModalRef} style={styles.shadow}>
      <BottomSheetView style={styles.contentContainer}>
        <View className="flex flex-col gap-4">
          <DebtorHeader
            profileImage={profileImage}
            id={id}
            nickname={nickname}
            name={name}
            status={status}
            statusColorbg={statusColorsbg[status] || "bg-blue-500"}
            statusColortxt={statusColorstxt[status] || "text-textb"}
            phoneNumber={phoneNumber}
            isSwitchOn={isSwitchOn}
            handleCallPress={handleCallPress}
            toggleSwitch={toggleSwitch}
          />
          <LoanDetails
            amount={5000}
            interestRate={10}
            totalDebt={5500}
            paymentPerInstallment={550}
            installmentCount={10}
            remainingDebt={2200}
            currentInstallment={4}
            totalInstallments={10}
            loanDate="12/04/24"
            paymentType="รายเดือน"
          />
          <AdditionalInfo
            address="248 หมู่ที่ 2 ถนน ถนน ซุปเปอร์ไฮเวย์ เชียงใหม่-ลำปาง ตำบล ปงยางคก อำเภอห้างฉัตร ลำปาง 52190"
            debtorType="ลูกหนี้เก่า"
            tag={["เพื่อน", "ครอบครัว", "ประยุทณ์"]} // Pass tags as an array of strings
            notes="ชอบกินไก่มาก"
          />
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
    minHeight: 600,
    gap: 16,
    padding: 20,
    width: "100%",
  },
});

export default DebtorModal;
