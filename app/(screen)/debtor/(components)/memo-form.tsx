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
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { Textarea } from "~/components/ui/textarea";
import { TagsInput } from "./tags-input";

export const MemoForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>
        <Controller
          control={control}
          name="additionalNote"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="additionalNote" optional>
                โน๊ตเพิ่มเติม
              </FormLabel>
              <Textarea
                className="!min-h-[160px]"
                placeholder="โปรดเขียนบางอย่างเพื่อกันลืม"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                aria-labelledby="textareaLabel"
              />
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="tags"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="phone" optional>
                เลือกตัวกรอง
              </FormLabel>
              <TagsInput setSelectedTags={onChange} selectedTags={value} />
            </FormItem>
          )}
        />
      </View>
    </StepFormScreen>
  );
};
