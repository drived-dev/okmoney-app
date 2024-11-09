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
  "Loan Number",
  "Principal",
  "Loan Type",
  "Payment Type",
  "First Payment Date",
  "Loan Category",
  "Loan Amount",
  "Installments",
  "Amount Paid",
  "Loan Status",
  "Remaining Balance",
  "Total Balance",
  "Total Loan Term",
  "Loan Term Type",
  "Loan Term Interval",
  "Interest Type",
  "Interest Rate",
  "Due Date",
  "Tags",
  "Creditor ID",
  "Amount Paid",
];

const dummyData = [
  {
    Nickname: "Johnny123",
    "First Name": "Johnny",
    "Last Name": "Doe",
    "Phone Number": "+6691213412",
    "Memo Note": "Sample note",
    "Loan Number": "LN-2024-10",
    Principal: 50000,
    "Loan Type": "fixed",
    "Payment Type": "monthly",
    "First Payment Date": "2024-01-01",
    "Loan Category": "oldLoan",
    "Loan Amount": 50000,
    Installments: 12,
    "Amount Paid": 1000,
    "Loan Status": 0,
    "Remaining Balance": 30000,
    "Total Balance": 50000,
    "Total Loan Term": 12,
    "Loan Term Type": "1",
    "Loan Term Interval": "1",
    "Interest Type": 0,
    "Interest Rate": 5.0,
    "Due Date": "2024-12-01",
    Tags: "business, short-term",
    "Creditor ID": "H7szNgGT5uJuTVPqa3XM",
  },
  {
    Nickname: "Jimmy007",
    "First Name": "Jimmy",
    "Last Name": "Smith",
    "Phone Number": "+6691213413",
    "Memo Note": "Second note",
    "Loan Number": "LN-2024-12",
    Principal: 60000,
    "Loan Type": "fixed",
    "Payment Type": "monthly",
    "First Payment Date": "2024-02-01",
    "Loan Category": "newLoan",
    "Loan Amount": 60000,
    Installments: 10,
    "Amount Paid": 1500,
    "Loan Status": 0,
    "Remaining Balance": 40000,
    "Total Balance": 60000,
    "Total Loan Term": 10,
    "Loan Term Type": 1,
    "Loan Term Interval": 1,
    "Interest Type": 0,
    "Interest Rate": 4.5,
    "Due Date": "2025-02-01",
    Tags: "fixed, long-term",
    "Creditor ID": "KpTkHTPAKvzpUloLhHbJ",
  },
  {
    Nickname: "MickyB",
    "First Name": "Mcky",
    "Last Name": "Barbie",
    "Phone Number": "+6691213414",
    "Memo Note": "Third note",
    "Loan Number": "LN-2024-13",
    Principal: 70000,
    "Loan Type": "adjustable",
    "Payment Type": "monthly",
    "First Payment Date": "2024-03-01",
    "Loan Category": "oldLoan",
    "Loan Amount": 70000,
    Installments: 15,
    "Amount Paid": 2000,
    "Loan Status": 0,
    "Remaining Balance": 50000,
    "Total Balance": 70000,
    "Total Loan Term": 15,
    "Loan Term Type": 1,
    "Loan Term Interval": 1,
    "Interest Type": 0,
    "Interest Rate": 3.5,
    "Due Date": "2024-10-01",
    Tags: "fixed, short-term",
    "Creditor ID": "JqTkLTPzV2kzaBlLhBbH",
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
