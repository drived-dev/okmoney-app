import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Input } from "~/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/components/ui/label";
import {
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "~/components/form";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { BUTTON } from "~/constants/Typography";

const formSchema = z.object({
  name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
});

const History = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(values.name);
  }

  return (
    <SafeAreaView>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormItem>
            <FormLabel nativeID="email">อีเมล</FormLabel>
            <Input
              placeholder="โปรดใส่อีเมล"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>

            <FormMessage errorMessage={errors.name?.message}></FormMessage>
          </FormItem>
        )}
      />

      <Button onPress={handleSubmit(onSubmit)}>
        <Text className={cn(BUTTON.white)}>สวัสดี</Text>
      </Button>
    </SafeAreaView>
  );
};

export default History;
