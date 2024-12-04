import { IconButton } from "~/components/icon-button";
import { FolderUpIcon } from "lucide-react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Platform } from "react-native";
import Papa from "papaparse";

// Define the headers and 3 rows of dummy data based on structuredData format
const headers = [
  "Nickname",
  "First Name",
  "Last Name",
  "Phone Number",
  "Memo Note",
  ///
  "Loan Number",
  "Loan Amount",
  "Amount Paid",
  "Interest Rate",
  "Installments",
  "Due Date",
  "Tags",
  "Loan Type",
  "Payment Type",
  "First Payment Date",
  "Loan Category",
];

const dummyData = [
  {
    Nickname: "Johnny123",
    "First Name": "Johnny",
    "Last Name": "Doe",
    "Phone Number": "+6691213412",
    "Memo Note": "Sample note",
    "Loan Number": "LN-2024-10",
    "Loan Amount": 50000,
    "Amount Paid": 1000,
    "Interest Rate": 5.0,
    Installments: 12,
    "Due Date": "2024-12-01",
    Tags: "business, short-term",
    "Loan Type": "",
    "Payment Type": "monthly",
    "First Payment Date": "2024-01-01",
    "Loan Category": "oldLoan",
  },
  {
    Nickname: "Jimmy007",
    "First Name": "Jimmy",
    "Last Name": "Smith",
    "Phone Number": "+6691213413",
    "Memo Note": "Second note",
    "Loan Number": "LN-2024-12",
    "Loan Amount": 60000,
    "Amount Paid": 1500,
    "Interest Rate": 4.5,
    Installments: 10,
    "Due Date": "2025-02-01",
    Tags: "fixed, long-term",
    "Loan Type": "FIXED",
    "Payment Type": "MONTHLY",
    "First Payment Date": "2024-02-01",
    "Loan Category": "newLoan",
  },
  {
    Nickname: "MickyB",
    "First Name": "Mcky",
    "Last Name": "Barbie",
    "Phone Number": "+6691213414",
    "Memo Note": "Third note",
    "Loan Number": "LN-2024-13",
    "Loan Amount": 70000,
    "Amount Paid": 2000,
    "Interest Rate": 3.5,
    Installments: 15,
    "Due Date": "2024-10-01",
    Tags: "fixed, short-term",
    "Loan Type": "FIXED",
    "Payment Type": "MONTHLY",
    "First Payment Date": "2024-03-01",
    "Loan Category": "oldLoan",
  },
];

// Function to create and save the CSV file
const downloadCSVTemplate = async () => {
  // Convert JSON to CSV format
  const csvContent = Papa.unparse({
    fields: headers,
    data: dummyData,
  });

  // Define filename and file URI
  const filename = "template.csv";
  const fileUri = FileSystem.documentDirectory + filename;

  // Write the CSV file to local storage
  await FileSystem.writeAsStringAsync(fileUri, csvContent, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  // Save or share the file based on platform
  if (Platform.OS === "android") {
    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (permissions.granted) {
      await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        filename,
        "text/csv"
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, csvContent, {
            encoding: FileSystem.EncodingType.UTF8,
          });
        })
        .catch((e) => console.error("Error writing file", e));
    } else {
      shareAsync(fileUri);
    }
  } else {
    shareAsync(fileUri);
  }
};

// Component to render the download button
const TemplateDownloadButton = () => {
  return (
    <IconButton
      icon={<FolderUpIcon />}
      text="Download CSV Template"
      onPress={downloadCSVTemplate}
    />
  );
};

export default TemplateDownloadButton;
