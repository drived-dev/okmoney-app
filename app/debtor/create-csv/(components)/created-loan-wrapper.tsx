import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Edit } from "lucide-react-native";
import { Loan } from "~/types/Loan";
import { DebtorName } from "~/components/debtor-name";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

interface CreatedLoanWrapperProps extends ViewProps {
  title: string;
  loanCount: number;
  loans: Loan[];
}

const CreatedLoanWrapper = ({
  title,
  loanCount,
  loans,
  className,
  ...props
}: CreatedLoanWrapperProps) => {
  return (
    <View className={cn(className)} {...props}>
      <View className="flex flex-row gap-2">
        <Text className={cn(PARAGRAPH)}>{title}</Text>
        <Text className={cn(LABEL, "text-gray-500")}>
          ทั้งหมด {loanCount} คน
        </Text>
      </View>
      <Separator className="my-2" />
      <FlatList
        data={loans}
        contentContainerStyle={{ gap: 4 }}
        renderItem={(item) => <CreatedLoanCard loan={item.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const CreatedLoanCard = ({ loan }: { loan: Loan }) => {
  return (
    <View className="flex flex-row gap-4 border border-muted rounded-2xl py-2 px-4 justify-between items-center">
      <View className="flex flex-col gap-1">
        <DebtorName name={loan.name} nickname={loan.nickname} />
        <Text className={cn(PARAGRAPH, "text-gray-500")}>
          {loan.total} บาท • {loan.totalLoanTerm} งวด
        </Text>
      </View>
      <Button size="icon" variant="ghost">
        <Edit color="gray" size={20} />
      </Button>
    </View>
  );
};

export default CreatedLoanWrapper;
