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
import Toast from "react-native-toast-message";

export const defaultValues = [
  {
    loanId: "001",
    tags: [],
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

  async function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    // TODO: need help make some optional
    const response = await createLoan({
      debtor: {
        firstName: values.name,
        lastName: values.lastname,
        phoneNumber: values.phone,
        memoNote: values.additionalNote,
      },
      loan: {
        loanNumber: "LN-2024-1001",
        principal: Number(values.loanAmount),
        loanStatus: 0,
        remainingBalance:
          Number(values.loanAmount) - Number(values.amountPaid || 0),
        totalBalance: Number(values.loanAmount),
        totalLoanTerm: Number(values.installments),
        loanTermType: 1,
        loanTermInterval: 1,
        interestType: 0,
        interestRate: parseFloat(values.interestRate),
        dueDate: values.dueDate,
        tags: values.tags,
        // firstPaymentDate: values.firstPaymentDate,
        creditorId: "H7szNgGT5uJuTVPqa3XM",
      },
    });

    if (response.status === 201) {
      Toast.show({
        text1: "Loan created successfully",
        type: "success",
      });
      router.back();
    } else {
      Toast.show({
        text1: "Failed to create loan",
        type: "error",
      });
    }
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
