import { Text, View } from "react-native";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { z } from "zod";
import { FormLabel, FormMessage, FormItem } from "~/components/form";
import { NavigationProps, StepFormScreen } from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import SelectInput, { SelectInputChoices } from "~/components/select-input";

const paymentTypeChoices: SelectInputChoices[] = [
  {
    value: "monthly",
    alias: "รายเดือน",
  },
  {
    value: "daily",
    alias: "รายวัน",
  },
  {
    value: "custom",
    alias: "กำหนดเอง",
  },
  {
    value: "custom",
    alias: "กำหนดเอง",
  },
  {
    value: "custom",
    alias: "กำหนดเอง",
  },
  {
    value: "custom",
    alias: "กำหนดเอง",
  },
  {
    value: "custom",
    alias: "กำหนดเอง",
  },
];

export const LoanDetailForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>
        <View className="flex flex-col gap-4">
          <Controller
            control={control}
            name="loanId"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="loanId">เลขที่สัญญากู้</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormMessage
                  errorMessage={errors.loanId?.message}
                ></FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="paymentType"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem>
                  <FormLabel nativeID="paymentType">เลขที่สัญญากู้</FormLabel>
                  <SelectInput
                    choices={paymentTypeChoices}
                    value={value}
                    onChange={onChange}
                  />
                  <FormMessage
                    errorMessage={errors.paymentType?.message}
                  ></FormMessage>
                </FormItem>
              );
            }}
          />
        </View>
      </View>
    </StepFormScreen>
  );
};
