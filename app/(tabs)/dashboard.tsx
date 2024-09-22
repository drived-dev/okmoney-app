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
import { StepForm, StepFormScreen } from "~/components/step-form";
import { cn } from "~/lib/utils";
import { COL_SPAN, FORM, ROW } from "~/constants/Styles";

const formSchemas = [
  z.object({
    email: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
  }),
  z.object({
    name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
  }),
];

const History = () => {
  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);
  }

  const forms = [EmailForm, NameForm];

  return (
    <StepForm onSubmit={onSubmit} forms={forms} formSchemas={formSchemas} />
  );
};

const EmailForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className={cn(FORM)}>
        <Text>Hello2</Text>
        <View className={cn(ROW)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem className={cn(COL_SPAN["1"])}>
                <FormLabel nativeID="email">อีเมล</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>
                <FormMessage errorMessage={errors.email?.message}>
                  d
                </FormMessage>
              </FormItem>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem className={cn(COL_SPAN["1"])}>
                <FormLabel nativeID="email">อีเมล</FormLabel>
                <Input
                  placeholder="โปรดใส่อีเมล"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
                <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>
                <FormMessage errorMessage={errors.email?.message}>
                  d
                </FormMessage>
              </FormItem>
            )}
          />
        </View>
      </View>
    </StepFormScreen>
  );
};

const NameForm = ({ navigation }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View>
        <View>
          <Text>Hello2</Text>
        </View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="name">ชื่อ</FormLabel>
              <Input
                placeholder="โปรดใส่อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>

              <FormMessage errorMessage={errors.name?.message}>d</FormMessage>
            </FormItem>
          )}
        />
      </View>
    </StepFormScreen>
  );
};

export default History;
