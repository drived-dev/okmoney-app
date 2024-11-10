import { View, Text } from "react-native";
import React from "react";
import { cn } from "~/lib/utils";
import { LABEL } from "~/constants/Typography";

const statusAlias: Record<string, string> = {
  OVERDUE: "ค้างชำระ",
  CLOSED: "ครบชำระ",
  DUE: "รอชำระ",
  UNDERDUE: "ใกล้กำหนด",
};

const statusColorsbg: Record<string, string> = {
  ค้างชำระ: "bg-red-500", // Overdue
  ครบชำระ: "bg-gray-200", // Paid
  รอชำระ: "bg-blue-500", // Pending
  ใกล้กำหนด: "bg-yellow-500", // Canceled
};

const statusColorstxt: Record<string, string> = {
  ค้างชำระ: "text-destructive-foreground", // Overdue
  ครบชำระ: "text-gray-600", // Paid
  รอชำระ: "text-destructive-foreground", // Pending
  ใกล้กำหนด: "text-destructive-foreground", // Canceled
};

interface StatusProps {
  status: string;
}

const Status = ({ status }: StatusProps) => {
  const parsedStatus = statusAlias[status] || status;
  const statusColorbg = statusColorsbg[parsedStatus] || "bg-blue-500";
  const statusColortxt = statusColorstxt[parsedStatus] || "text-textb";

  return (
    <View className={`px-3 py-2 rounded-2xl self-start ${statusColorbg}`}>
      <Text
        className={cn(
          LABEL,
          `font-ibm-semibold text-destructive-foreground ${statusColortxt}`
        )}
      >
        {parsedStatus}
      </Text>
    </View>
  );
};

export default Status;
