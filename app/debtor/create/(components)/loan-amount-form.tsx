import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
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
import {
  NavigationProps,
  StepForm,
  StepFormScreen,
  StepFormScreenProps,
} from "~/components/step-form";
import { cn } from "~/lib/utils";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { Card, CardContent } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import { useEffect, useState } from "react";

export const LoanAmountForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const [totalRepayment, setTotalRepayment] = useState(0);
  const [repaymentPerInstallment, setRepaymentPerInstallment] = useState(0);
  const [repaymentAmount, setRepaymentAmount] = useState(0);
  useEffect(() => {
    const subscription = watch((values) => {
      const { loanAmount, installments, amountPaid, interestRate } = values;
      const amountPaidNan = amountPaid ? Number(amountPaid) : 0;

      const remainingAmount = (
        Number(loanAmount) +
        loanAmount * (interestRate / 100)
      ).toFixed(2);
      const repaymentAmount = (remainingAmount - amountPaidNan).toFixed(2);
      const repaymentPerInstallment = (repaymentAmount / installments).toFixed(
        2
      );

      setTotalRepayment(remainingAmount > 0 ? remainingAmount : 0);
      setRepaymentPerInstallment(
        remainingAmount > 0 ? repaymentPerInstallment : 0
      );
      setRepaymentAmount(repaymentAmount > 0 ? repaymentAmount : 0);
    });

    return () => subscription.unsubscribe();
  }, [watch("interestRate")]);

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>
        <View className={cn(GRID)}>
          <View className={cn(GRID_ROW)}>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="loanAmount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="loanAmount">จำนวนเงินที่กู้</FormLabel>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <FormMessage
                      errorMessage={errors.loanAmount?.message}
                    ></FormMessage>
                  </FormItem>
                )}
              />
            </View>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="interestRate"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="interestRate">ดอกเบี้ย %</FormLabel>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <FormMessage errorMessage={errors.interestRate?.message} />
                  </FormItem>
                )}
              />
            </View>
          </View>

          <View className={cn(GRID_ROW)}>
            <Card className={cn(GRID_COL_SPAN[2], "gap-2 p-4")}>
              {getValues("loanCategory") === "oldLoan" && (
                <>
                  <View className="flex-row justify-between items-center">
                    <FormLabel nativeID="totalRepayment">
                      ยอดหนี้ที่ต้องชำระ
                    </FormLabel>
                    <View className="flex flex-row gap-2 items-end">
                      <Text className={cn(PARAGRAPH_BOLD)}>
                        {totalRepayment}
                      </Text>
                      <Text className={cn(PARAGRAPH)}>บาท</Text>
                    </View>
                  </View>

                  <View className={cn(GRID_ROW)}>
                    <View className={cn(GRID_COL_SPAN[1])}>
                      <Controller
                        control={control}
                        name="amountPaid"
                        render={({ field: { onChange, onBlur, value } }) => (
                          <FormItem className="flex flex-row justify-between items-center">
                            <FormLabel nativeID="amountPaid">
                              ยอดที่ชำระแล้ว
                            </FormLabel>
                            <Input
                              keyboardType="numeric"
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                              className="min-w-[100px] text-right"
                            />
                          </FormItem>
                        )}
                      />
                    </View>
                  </View>
                  <FormMessage
                    errorMessage={errors.amountPaid?.message}
                    className="w-[80%]"
                  />
                  <View className="w-full h-[1px] bg-gray-200"></View>
                </>
              )}
              <View className="flex-row justify-between items-center">
                <FormLabel nativeID="totalRepayment">
                  ยอดคงเหลือที่ต้องชำระ
                </FormLabel>

                <View className="flex flex-row gap-2 items-end">
                  <Text className={cn(PARAGRAPH_BOLD)}>{repaymentAmount}</Text>
                  <Text className={cn(PARAGRAPH)}>บาท</Text>
                </View>
              </View>
            </Card>
          </View>
          <View className={cn(GRID_ROW)}>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="installments"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="installments">จำนวนงวด</FormLabel>
                    <Input
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <FormMessage errorMessage={errors.installments?.message} />
                  </FormItem>
                )}
              />
            </View>
          </View>

          <View className={cn(GRID_ROW)}>
            <Card className={cn(GRID_COL_SPAN[2], "flex flex-col gap-2 p-4")}>
              <View className="flex-row justify-between items-center">
                <FormLabel nativeID="totalRepayment">
                  ยอดที่ต้องชำระแต่ละงวด
                </FormLabel>
                <View className="flex flex-row gap-2 items-end">
                  <Text className={cn(PARAGRAPH_BOLD)}>
                    {repaymentPerInstallment}
                  </Text>
                  <Text className={cn(PARAGRAPH)}>บาท</Text>
                </View>
              </View>
            </Card>
          </View>
        </View>
        <Controller
          control={control}
          name="autoPaymentToggle"
          render={({ field: { onChange, value } }) => (
            <Card className="p-4 justify-between flex-row items-center">
              <Text className={cn(PARAGRAPH)}>ทวงหนี้อัตโนมัติ</Text>
              <Switch
                checked={value}
                onCheckedChange={onChange}
                nativeID="auto-payment"
              ></Switch>
            </Card>
          )}
        />
      </View>
    </StepFormScreen>
  );
};
