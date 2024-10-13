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
import { coerce, z } from "zod";
import {
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "~/components/form";
import {
  StepForm,
  StepFormScreen,
  StepFormScreenProps,
} from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { InfoForm } from "./(components)/info-form";
import { LoanDetailForm } from "./(components)/loan-detail-form";
import { LoanAmountForm } from "./(components)/loan-amount-form";
import { MemoForm } from "./(components)/memo-form";
import { Button } from "~/components/ui/button";
import { LucideX } from "lucide-react-native";
import { router } from "expo-router";
import {
  InfoFormSchema,
  LoanAmountFormSchema,
  MemoFormSchema,
} from "~/lib/validation/loan-create";

export const defaultValues = [
  {
    loanId: "001",
    dueDate: new Date(),
    loanType: "fixed",
    paymentType: "monthly",
    firstPaymentDate: new Date(),
    loanTermType: undefined,
    loanCategory: "newLoan",
  },
];

interface Form {
  screen: React.FC<{ navigation: any }>;
  schema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
}

// TODO: custom message on schema
// TOOD: date constrant
export const forms: Form[] = [
  {
    screen: InfoForm,
    schema: InfoFormSchema,
  },
  {
    screen: LoanDetailForm,
    schema: LoanAmountFormSchema,
  },
  {
    screen: LoanAmountForm,
    schema: LoanAmountFormSchema,
  },
  {
    screen: MemoForm,
    schema: MemoFormSchema,
  },
];

const create = () => {
  const formSchemas = forms.map((form) => form.schema);
  const formScreens = forms.map((form) => form.screen);

  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);
  }

  return (
    <>
      <Button
        size="icon-lg"
        variant="ghost"
        className="ml-4 mt-6 mb-10"
        onPress={() => {
          router.back();
        }}
      >
        <LucideX color="black" size={24} />
      </Button>
      <StepForm
        onSubmit={onSubmit}
        forms={formScreens}
        formSchemas={formSchemas}
        defaultValues={defaultValues}
      />
    </>
  );
};

export default create;
