import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { IconButton } from "~/components/icon-button";
import { FolderUpIcon } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { useAssets } from "expo-asset";

const template = `
Username;Identifier;First name;Last name
booker12;9012;Rachel;Booker
grey07;2070;;Grey
johnson81;4081;Craig;Johnson
jenkins46;9346;Mary;Jenkins
smith79;5079;Jamie;Smith
`;

const TemplateDownload = () => {
  async function saveFile(uri, filename, mimetype) {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  }

  async function download() {
    const filename = "template.csv";
    const fileUri = FileSystem.documentDirectory + filename;

    await FileSystem.writeAsStringAsync(fileUri, template, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    saveFile(fileUri, filename, "text/csv");
  }

  return (
    <IconButton icon={<FolderUpIcon />} text="ดาวโหลด" onPress={download} />
  );
};

export default TemplateDownload;

const styles = StyleSheet.create({});
