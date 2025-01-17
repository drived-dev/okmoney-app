import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Children, useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { z } from "zod";
import {
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "~/components/form";
import {
  NavigationProps,
  StepForm,
  StepFormScreen,
  StepFormScreenProps,
} from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { LABEL, TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";

export const InfoForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className={cn(GRID)}>
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>

        <Controller
          control={control}
          name="nickname"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="nickname">ชื่อเล่น</FormLabel>
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              <FormMessage
                errorMessage={errors.nickname?.message}
              ></FormMessage>
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="phone">เบอร์โทร</FormLabel>
              <PhoneInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormMessage errorMessage={errors.phone?.message} />
            </FormItem>
          )}
        />
        <View className={cn(GRID_ROW)}>
          <View className={cn(GRID_COL_SPAN[1])}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormItem>
                  <FormLabel nativeID="name" optional>
                    ชื่อ
                  </FormLabel>
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <FormMessage errorMessage={errors.name?.message} />
                </FormItem>
              )}
            />
          </View>
          <View className={cn(GRID_COL_SPAN[1])}>
            <Controller
              control={control}
              name="lastname"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormItem>
                  <FormLabel nativeID="lastname" optional>
                    นามสกุล
                  </FormLabel>
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                  <FormMessage errorMessage={errors.lastname?.message} />
                </FormItem>
              )}
            />
          </View>
        </View>
      </View>
    </StepFormScreen>
  );
};
