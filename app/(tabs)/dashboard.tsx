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
import PhoneInput from "~/components/phone-input";

const formSchema = z.object({
  phone: z.string(),
});

const History = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    alert(values.phone);
  }

  return <SafeAreaView></SafeAreaView>;
};

export default History;
