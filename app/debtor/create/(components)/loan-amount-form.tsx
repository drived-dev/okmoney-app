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
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import PhoneInput from "~/components/phone-input";
import { Card, CardContent } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";

export const LoanAmountForm = ({ navigation }: NavigationProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <StepFormScreen navigation={navigation}>
      <View className="flex flex-col gap-4">
        <Text className={cn(TITLE)}>สร้างลูกหนี้่</Text>
        <View className={cn(GRID)}>
          <View className={cn(GRID_ROW)}>
            <View className={cn(GRID_COL_SPAN[2])}>
              <Controller
                control={control}
                name="loanAmount"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="loanAmount">จำนวนเงินที่กู้</FormLabel>
                    <Input
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
            <View className={cn(GRID_COL_SPAN[2])}>
              <Controller
                control={control}
                name="totalRepayment"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="totalRepayment">
                      ยอดหนี้ที่ต้องชำระ
                    </FormLabel>
                    <Input
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                    <FormMessage
                      errorMessage={errors.totalRepayment?.message}
                    ></FormMessage>
                  </FormItem>
                )}
              />
            </View>
            <View className={cn(GRID_COL_SPAN[1])}>
              <Controller
                control={control}
                name="installments"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormItem>
                    <FormLabel nativeID="installments">จำนวนงวด </FormLabel>
                    <Input
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
          <Controller
            control={control}
            name="repaymentPerInstallment"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormItem>
                <FormLabel nativeID="repaymentPerInstallment">
                  ยอดที่ต้องชำระแต่ละงวด
                </FormLabel>
                <Input onBlur={onBlur} onChangeText={onChange} value={value} />
                <FormMessage
                  errorMessage={errors.repaymentPerInstallment?.message}
                />
              </FormItem>
            )}
          />
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
