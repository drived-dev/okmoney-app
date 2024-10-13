import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BUTTON, LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { CONTAINER } from "~/constants/Styles";
import { Loan } from "~/types/Loan";
import { Edit } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import CreatedLoanWrapper from "./(components)/created-loan-wrapper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLoanBufferStore } from "~/store/use-loan-buffer-store";
import { LoanAmountForm } from "../create/(components)/loan-amount-form";
import { LoanDetailForm } from "../create/(components)/loan-detail-form";
import { InfoForm } from "../create/(components)/info-form";
import { MemoForm } from "../create/(components)/memo-form";
import { late, z } from "zod";
import {
  LoanAmountFormSchema,
  InfoFormSchema,
  MemoFormSchema,
  LoanDetailFormSchema,
} from "~/lib/validation/loan-create";
import { Form } from "react-hook-form";
import ErrorDropdown from "./(components)/error-dropdown";

export interface Error {
  [key: string]: string[];
}

//TODO: Loan Id
const Summary = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<Error[]>([]);
  const [validLoans, setValidLoans] = useState<Loan[]>([]);
  const [invalidLoans, setInvalidLoans] = useState<Loan[]>([]);
  const { loanBuffers, resetLoanBuffers } = useLoanBufferStore();
  const loansValidationSchemas = z.object({
    ...InfoFormSchema.shape,
    ...LoanDetailFormSchema.shape,
    ...LoanAmountFormSchema.shape,
    ...MemoFormSchema.shape,
  });

  function reset() {
    resetLoanBuffers();
    router.back();
  }

  function onSubmit() {
    // TODO: integrate with backend
    console.log(validLoans);
  }

  function validateLoans(loanBuffers: Loan[]) {
    loanBuffers.forEach((loan) => {
      try {
        loansValidationSchemas.parse(loan);

        if (loan.name) setValidLoans((prev) => [...prev, loan]);
      } catch (err) {
        if (err instanceof z.ZodError) {
          setInvalidLoans((prev) => [...prev, loan]);

          const errorMessages = err.issues.map(
            (error) => `${error.path[0]} is ${error.message}`
          );
          const errorKey = loan.name || "ลูกหนี้นิรนาม";
          const concatError = {
            [errorKey]: errorMessages,
          };

          setErrors((prev) => [...prev, concatError]);
        }
      }
    });
  }

  React.useEffect(() => {
    validateLoans(loanBuffers);
  }, []);

  return (
    <>
      <View className="flex flex-col gap-2 flex-1">
        <CreatedLoanWrapper title="เพิ่มลูกหนี้สำเร็จ" loans={validLoans} />
        <CreatedLoanWrapper title="เกิดข้อผิดพลาด" loans={invalidLoans} />
      </View>

      <View className="mt-auto flex-col gap-2 justify-end">
        {errors.length > 0 && (
          <FlatList
            className="max-h-[10vh]"
            data={errors}
            contentContainerStyle={{ gap: 4 }}
            renderItem={({ item }) => <ErrorDropdown error={item} />}
            keyExtractor={(item, index) => `errorMessage-${index}`}
          />
        )}
        <View className="flex-row gap-1">
          <Button className="flex-1" variant="outline" onPress={reset}>
            <Text className={cn(BUTTON.black)}>อัปโหลดใหม่</Text>
          </Button>
          <Button
            className="flex-1"
            disabled={invalidLoans.length > 0}
            onPress={onSubmit}
          >
            <Text className={cn(BUTTON.white)}>บันทึก</Text>
          </Button>
        </View>
      </View>
    </>
  );
};

export default Summary;
