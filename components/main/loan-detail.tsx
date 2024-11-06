import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";

// Define the props interface
interface LoanDetailsProps {
  amount: number; // as a number
  interestRate: number; // as a number
  totalDebt: number; // as a number
  paymentPerInstallment: number; // as a number
  installmentCount: number; // as a number
  remainingDebt: number; // as a number
  currentInstallment: number; // as a number
  totalInstallments: number; // as a number
  loanDate: string;
  paymentType: string;
}

const LoanDetails: React.FC<LoanDetailsProps> = ({
  amount,
  interestRate,
  totalDebt,
  paymentPerInstallment,
  installmentCount,
  remainingDebt,
  currentInstallment,
  totalInstallments,
  loanDate,
  paymentType,
}) => {
  return (
    <View className="flex flex-col gap-2">
      <View>
        <Text className={cn(PARAGRAPH_BOLD, "")}>ข้อมูลหนี้</Text>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View className={cn(GRID, "")}>
        <View className={cn(GRID_ROW, "")}>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>จำนวนเงินกู้</Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {amount.toLocaleString()} บาท
            </Text>
          </View>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>
              เปอร์เซ็นต์ดอกเบี้ย
            </Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {interestRate}%{/* Append % symbol */}
            </Text>
          </View>
        </View>
        <View className={cn(GRID_ROW, "")}>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>
              ยอดหนี้ที่ต้องชำระ
            </Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {totalDebt.toLocaleString()} บาท
            </Text>
          </View>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>ยอดชำระ/งวด</Text>
            <View className="flex flex-row">
              <Text className={cn(PARAGRAPH, "text-foreground")}>
                {paymentPerInstallment.toLocaleString()} บาท
              </Text>
              <Text className={cn(LABEL, "text-[#808080]")}>
                {" "}
                x {installmentCount} งวด{/* Format installment count */}
              </Text>
            </View>
          </View>
        </View>
        <View className={cn(GRID_ROW, "")}>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>ยอดหนี้ที่เหลือ</Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {remainingDebt.toLocaleString()} บาท
            </Text>
          </View>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>จำนวนงวด</Text>
            <View className="flex flex-row">
              <Text className={cn(PARAGRAPH, "text-foreground")}>
                {currentInstallment}
              </Text>
              <Text className={cn(LABEL, "text-[#808080]")}>
                {" "}
                / {totalInstallments} งวด{/* Format total installments */}
              </Text>
            </View>
          </View>
        </View>
        <View className={cn(GRID_ROW, "")}>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>วันที่ยืม</Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>{loanDate}</Text>
          </View>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>ประเภทการชำระ</Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {paymentType}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoanDetails;
