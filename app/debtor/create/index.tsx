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
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { InfoForm } from "./(components)/info-form";
import { LoanDetailForm } from "./(components)/loan-detail-form";

export const formSchemas = [
  z.object({
    loanId: z.string(),
    dueDate: z.date(),
    loanType: z.enum(["fixed", "adjustable"]),
    paymentType: z.enum(["monthly", "daily", "custom"]),
    firstPaymentDate: z.date(),
    loanTermType: z.string(),
    loanCategory: z.enum(["newLoan", "oldLoan"]),
  }),
  z.object({
    name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(30),
    lastname: z
      .string()
      .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
      .max(30),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
      message: "Invalid phone number format",
    }),
  }),
];

const create = () => {
  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);
  }

  const forms = [LoanDetailForm];

  return (
    <StepForm onSubmit={onSubmit} forms={forms} formSchemas={formSchemas} />
  );
};

export default create;
