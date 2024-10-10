import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { IconButton } from "~/components/icon-button";
import { FolderUpIcon } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

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
    // TODO: change to real template file
    const filename = "template.csv";
    const result = await FileSystem.downloadAsync(
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.csv",
      FileSystem.documentDirectory + filename
    );

    // Log the download result
    console.log(result);

    // Save the downloaded file
    saveFile(result.uri, filename, result.headers["Content-Type"]);
  }
  return (
    <IconButton icon={<FolderUpIcon />} text="ดาวโหลด" onPress={download} />
  );
};

export default TemplateDownload;

const styles = StyleSheet.create({});
