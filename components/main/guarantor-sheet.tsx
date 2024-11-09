import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { NotebookPen, X } from "lucide-react-native";
import { cn } from "~/lib/utils";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/button";
import { AvatarText } from "../avatar-text";
import Toast from "react-native-toast-message";
import useEditingLoanStore from "~/store/use-editing-loan-store";
import PhoneInput from "../phone-input";
import { addGuarantorToLoan } from "~/api/guarantor/add-guarantor-to-loan";
const guarantorSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
    .max(20)
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
    .max(20)
    .optional(),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format",
    })
    .optional(),
});

const GuarantorSheet = forwardRef((propTypes, bottomSheetModalRef) => {
  const { id, removeId } = useEditingLoanStore();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof guarantorSchema>>({
    resolver: zodResolver(guarantorSchema),
  });

  function onSubmit(data) {
    console.log(data);
    console.log(id);
    const respond = addGuarantorToLoan(data);
    // setValue to reset all
    // TODO: change info text
    Toast.show({
      type: "success",
      position: "bottom",
      text1: `${id}`,
      text2: "This is some something 👋",
    });
  }

  // renders
  return (
    <BottomSheetModal ref={bottomSheetModalRef} style={styles.shadow}>
      <BottomSheetView style={styles.contentContainer}>
        <Text className={cn(TITLE)}>ข้อมูลผู้ค้ำประกัน</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="firstName">ชื่อ</FormLabel>
              <Input
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormMessage errorMessage={errors.firstName?.message} />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="lastName">นามสกุล</FormLabel>
              <Input
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormMessage errorMessage={errors.lastName?.message} />
            </FormItem>
          )}
        />

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="phoneNumber">เบอร์โทร</FormLabel>

              <PhoneInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormMessage errorMessage={errors.phoneNumber?.message} />
            </FormItem>
          )}
        />

        <IconButton
          onPress={handleSubmit(onSubmit)}
          className="mt-auto"
          icon={<NotebookPen />}
          text="บันทึกรายการ"
        ></IconButton>
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
    minHeight: 400,
    gap: 16,
    padding: 20,
    width: "100%",
  },
});

export default GuarantorSheet;
