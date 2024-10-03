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
import CalendarInput from "~/components/calendar-input";

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
];

const loanTypeChoices: SelectInputChoices[] = [
  {
    value: "fixed",
    alias: "ดอกเบี้ยคงที่",
  },
  {
    value: "adjustable",
    alias: "ดอกเบี้ยที่กำหนดเอง",
  },
];

const loanCategoryChoices: SelectInputChoices[] = [
  {
    value: "newLoan",
    alias: "สัญญาใหม่",
  },
  {
    value: "oldLoan",
    alias: "สัญญาเก่า",
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
                <FormMessage errorMessage={errors.loanId?.message} />
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <FormLabel nativeID="dueDate">วันที่ครบกำหนดชำระ</FormLabel>
                <CalendarInput onChange={onChange} value={value} />
                <FormMessage errorMessage={errors.dueDate?.message} />
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="loanType"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem>
                  <FormLabel nativeID="loanType">รูปแบบการยืม</FormLabel>
                  <SelectInput
                    choices={loanTypeChoices}
                    value={value}
                    onChange={onChange}
                  />
                  <FormMessage errorMessage={errors.loanType?.message} />
                </FormItem>
              );
            }}
          />

          <Controller
            control={control}
            name="paymentType"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem>
                  <FormLabel nativeID="paymentType">ประเภทการชำระ</FormLabel>
                  <SelectInput
                    choices={paymentTypeChoices}
                    value={value}
                    onChange={onChange}
                  />
                  <FormMessage errorMessage={errors.paymentType?.message} />
                </FormItem>
              );
            }}
          />
          <View className={cn(GRID_ROW)}>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="firstPaymentDate"
                render={({ field: { onChange, value } }) => {
                  return (
                    <FormItem>
                      <FormLabel nativeID="firstPaymentDate">
                        วันที่ชำระงวดแรก
                      </FormLabel>
                      <CalendarInput onChange={onChange} value={value} />
                      <FormMessage
                        errorMessage={errors.firstPaymentDate?.message}
                      />
                    </FormItem>
                  );
                }}
              />
            </View>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="loanTermType"
                render={({ field: { onBlur, onChange, value } }) => {
                  return (
                    <FormItem>
                      <FormLabel nativeID="loanTermType">ประเภท</FormLabel>
                      <Input
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        placeholder="3 วัน"
                      />
                      <FormMessage
                        errorMessage={errors.loanTermType?.message}
                      />
                    </FormItem>
                  );
                }}
              />
            </View>
          </View>
          <Controller
            control={control}
            name="loanCategory"
            render={({ field: { onChange, value } }) => {
              return (
                <FormItem>
                  <FormLabel nativeID="loanCategory">ประเภทลูกหนี้</FormLabel>
                  <SelectInput
                    choices={loanCategoryChoices}
                    value={value}
                    onChange={onChange}
                  />
                  <FormMessage errorMessage={errors.loanCategory?.message} />
                </FormItem>
              );
            }}
          />
        </View>
      </View>
    </StepFormScreen>
  );
};
