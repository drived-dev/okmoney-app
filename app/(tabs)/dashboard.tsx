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
import Feedback from "../../components/feedback";

const History = () => {
  return (
    <SafeAreaView>
      <Feedback />
    </SafeAreaView>
  );
};

export default History;
