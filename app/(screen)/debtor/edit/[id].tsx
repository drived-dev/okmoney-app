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
import { InfoForm } from "../(components)/info-form";
import { LoanDetailForm } from "../(components)/loan-detail-form";
import { LoanAmountForm } from "../(components)/loan-amount-form";
import { MemoForm } from "../(components)/memo-form";
import { Button } from "~/components/ui/button";
import { LucideX } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
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
import { Loan, LoanStatus } from "~/types/Loan";
import useLoanStore from "~/store/use-loan-store";
import { parseLoanData } from "~/lib/parse-loan-datas";
import { useLoanBufferStore } from "~/store/use-loan-buffer-store";
import LoadingScreen from "~/components/loading-screen";

interface Form {
  screen: React.FC<{ navigation: any }>;
  schema: z.AnyZodObject | z.ZodEffects<z.AnyZodObject>;
}

export const forms: Form[] = [
  {
    screen: InfoForm,
    schema: InfoFormSchema,
  },
  {
    screen: MemoForm,
    schema: MemoFormSchema,
  },
];

const create = () => {
  const { id } = useLocalSearchParams();
  const { getLoanByDebtorId } = useLoanStore();
  const loan = getLoanByDebtorId(id as string);
  console.log(loan);

  const formSchemas = forms.map((form) => form.schema);
  const formScreens = forms.map((form) => form.screen);
  const addLoan = useLoanStore((state) => state.addLoan);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = [
    {
      loanId: loan?.loanNumber,
      name: loan?.firstName,
      lastname: loan?.lastName,
      nickname: loan?.nickname,
      phone: loan?.phoneNumber,
      additionalNote: loan?.debtor?.memoNote,
      dueDate: loan?.dueDate,
      loanType: loan?.interestType,
      paymentType: loan?.loanTermType,
      firstPaymentDate: new Date(),
      loanTermType: undefined,
      loanCategory: "NEW_LOAN",
    },
  ];

  async function onSubmit(values: z.infer<(typeof formSchemas)[0]>) {
    setIsLoading(true);
    const totalBalance =
      Number(values.loanAmount) +
      (Number(values.interestRate) / 100) * Number(values.loanAmount);
    const loanData = {
      debtor: {
        nickname: values.nickname,
        firstName: values.name,
        lastName: values.lastname,
        phoneNumber: values.phone,
        memoNote: values.additionalNote,
      },
      loan: {
        tags: values.tags,
      },
    };
    const response = await createLoan(loanData);

    if (response.status === 201) {
      Toast.show({
        text1: "Loan created successfully",
        type: "success",
      });
      addLoan(parseLoanData(response.data.data));
      router.back();
      return true;
    } else {
      Toast.show({
        text1: "Failed to create loan",
        type: "error",
      });
    }
    setIsLoading(false);
    return false;
  }

  return (
    <SafeAreaView className="flex-1">
      <CloseButton className="ml-4 mb-10" />
      <StepForm
        onSubmit={onSubmit}
        forms={formScreens}
        formSchemas={formSchemas}
        defaultValues={defaultValues}
        disabled={isLoading}
      />
    </SafeAreaView>
  );
};

export default OnlineOnly(create);
