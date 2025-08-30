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
  TouchableWithoutFeedback,
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
import useLoanStore from "~/store/use-loan-store";

const DebtorModal = forwardRef((propTypes, bottomSheetModalRef) => {
  const { id } = useEditingLoanStore();
  const loan = useLoanStore.getState().getLoanById(id);
  const phoneNumber = loan?.phoneNumber;
  // Add a state for the toggle switch
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  console.log(loan);
  // Toggle Switch Handler
  const toggleSwitch = () => setIsSwitchOn((previousState) => !previousState);

  // Function to initiate a phone call
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <TouchableWithoutFeedback>
      <BottomSheetModal ref={bottomSheetModalRef} style={styles.shadow}>
        <BottomSheetView style={styles.contentContainer}>
          <View className="flex flex-col gap-4">
            <DebtorHeader
              profileImage={loan?.profileImage || ""}
              loanNumber={loan?.loanNumber || ""}
              id={loan?.id || ""}
              nickname={loan?.nickname || ""}
              name={`${loan?.firstName || ""} ${loan?.lastName || ""}`}
              // TODO: fix this
              status={loan?.status || ""}
              phoneNumber={phoneNumber}
              isSwitchOn={isSwitchOn}
              handleCallPress={handleCallPress}
              toggleSwitch={toggleSwitch}
            />
            <LoanDetails
              amount={loan?.principal || 0}
              interestRate={loan?.interestRate || 0}
              totalDebt={loan?.total || 0}
              paymentPerInstallment={loan?.paymentPerInstallment || 0}
              installmentCount={loan?.installmentCount || 0}
              remainingDebt={loan?.remainingBalance || 0}
              currentInstallment={loan?.currentInstallment || 0}
              totalInstallments={loan?.installmentCount || 0}
              loanDate={loan?.loanDate || ""}
              paymentType={loan?.paymentType || ""}
            />
            <AdditionalInfo
              debtorType={loan?.loanStatus || "-"}
              tag={loan?.tags || []} // Pass tags as an array of strings
              notes={loan?.notes || ""}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </TouchableWithoutFeedback>
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
