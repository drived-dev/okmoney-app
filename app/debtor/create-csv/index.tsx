import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  LABEL,
  PARAGRAPH,
  PARAGRAPH_BOLD,
  TITLE,
} from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { GRID, GRID_ROW, CONTAINER, GRID_COL_SPAN } from "~/constants/Styles";
import { NumberBadge } from "./(components)/number-badge";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/icon-button";
import {
  ChevronDown,
  FolderDotIcon,
  FolderUpIcon,
  Upload,
} from "lucide-react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Card, CardHeader } from "~/components/ui/card";
import { Image } from "expo-image";
import DocumentInput from "~/components/document-input";
import TemplateDownload from "./(components)/template-download";
import TemplateExampleCollapsible from "./(components)/template-example-collapsible";
import { readString } from "react-native-csv";
import { useRouter } from "expo-router";
import { useStore } from "zustand";
import { useLoanBufferStore } from "~/store/use-loan-buffer-store";
import OnlineOnly from "~/components/online-only";

interface InputData {
  data: string[][];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

interface MappedData {
  [key: string]: string;
}

const index = () => {
  const router = useRouter();
  const setLoanBuffers = useLoanBufferStore((state) => state.setLoanBuffers);

  function onSubmit(fileContent: string): any[] {
    // Parse CSV content
    const json = readString(fileContent, {
      header: true,
      skipEmptyLines: true,
    });
    console.log("Parsed JSON:", json); // Log parsed JSON for verification

    const structuredData = json.data.map((row) => ({
      // Infoform
      nickname: row["Nickname"],
      name: row["First Name"],
      lastname: row["Last Name"],
      phone: row["Phone Number"],
      additionalNote: row["Memo Note"],

      // LoanDetail
      loanId: row["Loan Number"],
      loanAmount: row["Loan Amount"],
      amountPaid: row["Amount Paid"],
      interestRate: parseFloat(row["Interest Rate"]),
      installments: row["Installments"],
      dueDate: row["Due Date"] ? new Date(row["Due Date"]) : null, // Convert to Date type
      tags: row["Tags"] ? row["Tags"].split(",") : [],
      loanType: row["Loan Type"],
      paymentType: row["Payment Type"],
      firstPaymentDate: new Date(row["First Payment Date"]),
      loanCategory: row["Loan Category"],
    }));

    console.log("Structured Data:", structuredData); // Log structured data for verification

    setLoanBuffers(structuredData);
    router.push("/debtor/create-csv/summary");

    return structuredData;
  }

  return (
    <>
      <View className={cn(GRID_ROW)}>
        <NumberBadge text="1" />
        <View className={cn(GRID_COL_SPAN[1], "flex flex-col gap-1")}>
          <Text className={cn(PARAGRAPH)}>ดาวโหลด template.csv</Text>
          <TemplateDownload />
        </View>
      </View>

      <View className={cn(GRID_ROW)}>
        <NumberBadge text="2" />
        <View className={cn(GRID_COL_SPAN[1], "flex flex-col gap-1")}>
          <Text className={cn(PARAGRAPH)}>กรอกข้อมูลลงใน template.csv</Text>
          <Text className={cn(LABEL, "text-gray-500")}>
            โดยใช้โปรแกรม เช่น Excel, google sheet
          </Text>
          <TemplateExampleCollapsible />
        </View>
      </View>

      <View className={cn(GRID_ROW)}>
        <NumberBadge text="3" />
        <View className={cn(GRID_COL_SPAN[1], "flex flex-col gap-1")}>
          <Text className={cn(PARAGRAPH)}>
            อัปโหลด template.csv ที่กรอกข้อมูลแล้ว
          </Text>
          <Text className={cn(LABEL, "text-gray-500")}>
            กรอกข้อมูลตามแบบฟอร์ม
          </Text>
          <DocumentInput onSubmit={onSubmit} documentType={"text/csv"} />
        </View>
      </View>
    </>
  );
};

export default index;
