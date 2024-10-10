import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, CardHeader } from "./ui/card";
import { Upload } from "lucide-react-native";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import * as DocumentPicker from "expo-document-picker";

const DocumentInput = () => {
  async function getCSV() {
    await DocumentPicker.getDocumentAsync({ type: "application/csv" });
  }

  return (
    <TouchableOpacity onPress={() => getCSV()}>
      <Card className="border-dashed ">
        <CardHeader className="flex flex-col justify-between items-center gap-2">
          <Upload color="gray" />
          <Text className={cn(PARAGRAPH, "text-gray-500")}>
            อัปโหลดสลิปการโอนเงิน
          </Text>
        </CardHeader>
      </Card>
    </TouchableOpacity>
  );
};

export default DocumentInput;

const styles = StyleSheet.create({});
