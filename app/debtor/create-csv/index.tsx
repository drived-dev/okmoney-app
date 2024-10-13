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
import { Loan } from "~/types/Loan";

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

  function onSubmit(fileContent) {
    const json: InputData = readString(fileContent) as InputData;
    const data = json.data;

    const filteredData = data.filter((row) => row.length > 1);

    // Extract headers (first row, index 0 after filtering)
    const headers = filteredData[0].map((header) => header.trim());

    // Map each subsequent row to an object using the headers as keys
    const mappedData = filteredData.slice(1).map((row) => {
      let obj: MappedData = {};
      headers.forEach((header, index) => {
        obj[header] = row[index];
      });

      return obj;
    });

    setLoanBuffers(mappedData);

    router.push("/debtor/create-csv/summary");
  }
  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex flex-col gap-5")}>
        <Text className={cn(TITLE)}>สร้างลูกหนี้่จำนวนมาก</Text>
        <Text className={cn(PARAGRAPH)}>สร้างลูกหนี้หลายคนพร้อมกัน</Text>

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
          <NumberBadge text="1" />
          <View className={cn(GRID_COL_SPAN[1], "flex flex-col gap-1")}>
            <Text className={cn(PARAGRAPH)}>
              อัปโหลด template.csv ที่กรอกข้อมูลแล้ว
            </Text>
            <Text className={cn(LABEL, "text-gray-500")}>
              กรอกข้อมูลตามแบบฟอร์ม
            </Text>
            <DocumentInput onSubmit={onSubmit} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
