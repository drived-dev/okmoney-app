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
import { LucideAArrowDown } from "lucide-react-native";
import PhoneInput from "~/components/phone-input";
import { router, useRouter } from "expo-router";

const History = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      <Button onPress={() => router.push("/debtor/create-csv")}></Button>
    </SafeAreaView>
  );
};

export default History;
