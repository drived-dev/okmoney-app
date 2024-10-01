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
        </View>
      </View>
    </StepFormScreen>
  );
};
