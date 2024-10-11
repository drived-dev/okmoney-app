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

const index = () => {
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
            <DocumentInput />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
