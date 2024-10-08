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
    schema: z.object({
      nickname: z
        .string()
        .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
        .max(10),
      name: z
        .string()
        .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
        .max(20)
        .optional(),
      lastname: z
        .string()
        .min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" })
        .max(20)
        .optional(),
      phone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, {
          message: "Invalid phone number format",
        })
        .optional(),
    }),
  },
  {
    screen: LoanDetailForm,
    schema: z
      .object({
        loanId: z
          .string()
          .min(1, { message: "ชื่อต้องมากกว่า 1 ตัวอักษร" })
          .max(10),
        dueDate: z.date().default(new Date()),
        loanType: z.enum(["fixed", "adjustable"]),
        paymentType: z.enum(["monthly", "daily", "custom"]),
        firstPaymentDate: z.date(),
        loanTermType: z.string().optional(),
        loanCategory: z.enum(["newLoan", "oldLoan"]),
      })
      .refine(
        // raise error when paymentType custom is selected
        (input) => {
          if (
            input.paymentType === "custom" &&
            (input.loanTermType === "" || input.loanTermType === undefined)
          ) {
            return false;
          }
          return true;
        },
        { message: "จำเป็นต้องใส่ข้อมูลประเภท", path: ["loanTermType"] }
      ),
  },
  {
    screen: LoanAmountForm,
    schema: z.object({
      loanAmount: z.coerce
        .number()
        .positive()
        .min(0, { message: "จำนวนเงินกู้ต้องมากกว่าหรือเท่ากับ 0" }),
      interestRate: z.coerce
        .number()
        .positive()
        .min(0)
        .max(100, { message: "อัตราดอกเบี้ยต้องอยู่ระหว่าง 0 ถึง 100" }),
      totalRepayment: z.coerce
        .number()
        .positive()
        .min(0, { message: "ยอดหนี้ที่ต้องชำระต้องมากกว่าหรือเท่ากับ 0" }),
      installments: z.coerce
        .number()
        .positive()
        .int()
        .min(1, { message: "จำนวนงวดต้องมากกว่าหรือเท่ากับ 1" }),
      amountPaid: z.coerce
        .number()
        .positive()
        .min(0, { message: "ยอดที่ชำระแล้วต้องมากกว่าหรือเท่ากับ 0" }),
      installmentsPaid: z.coerce
        .number()
        .positive()
        .int()
        .min(0, { message: "จำนวนงวดที่ชำระแล้วต้องมากกว่าหรือเท่ากับ 0" }),
      remainingAmount: z.coerce
        .number()
        .positive()
        .min(0, { message: "ยอดคงเหลือที่ต้องชำระต้องมากกว่าหรือเท่ากับ 0" }),
      repaymentPerInstallment: z.coerce
        .number()
        .positive()
        .min(0, { message: "ยอดที่ต้องชำระแต่ละงวดต้องมากกว่าหรือเท่ากับ 0" }),
      autoPaymentToggle: z.boolean(),
    }),
  },
  {
    screen: MemoForm,
    schema: z.object({
      additionalNote: z.string().max(100).optional(),
      tags: z.array(z.string()).optional(),
    }),
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
