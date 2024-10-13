import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card, CardHeader } from "./ui/card";
import { Upload } from "lucide-react-native";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

const DocumentInput = ({ documentType, onSubmit }) => {
  async function getDocument() {
    try {
      // Open the document picker
      const document = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
      });

      if (document.canceled === true) {
        return;
      }

      if (document.assets == null) throw Error("document is null");

      const asset = document.assets[0];

      // Read the file content as a string
      const content = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      onSubmit(content);
    } catch (error) {
      console.error("Error reading the file:", error);
    }
  }

  return (
    <TouchableOpacity onPress={() => getDocument()}>
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
