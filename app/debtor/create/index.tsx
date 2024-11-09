import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { Children, useEffect, useState } from "react";
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
  LoanDetailFormSchema,
  MemoFormSchema,
} from "~/lib/validation/loan-create";
import CloseButton from "~/components/close-button";
import OnlineOnly from "~/components/online-only";
import { createLoan } from "~/api/loans/create-loan";

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
    schema: LoanDetailFormSchema,
  },
  {
    screen: LoanAmountForm,
    schema: LoanAmountFormSchema,
  },
  // {
  //   screen: MemoForm,
  //   schema: MemoFormSchema,
  // },
];

const create = () => {
  const formSchemas = forms.map((form) => form.schema);
  const formScreens = forms.map((form) => form.screen);

  function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    alert(values);
    console.log(values);

    // TODO: implement createLoan and fix bug
    createLoan({
      debtor: {
        firstName: "dsds",
        lastName: "sdsd",
        phoneNumber: "+66812345678",
      },
      loan: {
        principal: 1,
        loanStatus: 0,
        remainingBalance: 1,
        totalBalance: 1,
        totalLoanTerm: 1,
        loanTermType: 0,
        loanTermInterval: 1,
        interestType: 0,
        interestRate: 1,
        dueDate: new Date(),
        tags: [],
      },
    });
  }

  return (
    <>
      <CloseButton className="ml-4 mt-6 mb-10" />
      <StepForm
        onSubmit={onSubmit}
        forms={formScreens}
        formSchemas={formSchemas}
        defaultValues={defaultValues}
      />
    </>
  );
};

export default OnlineOnly(create);
