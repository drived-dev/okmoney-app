import React from "react";
import { StyleSheet, View, Text, FlatList, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { ChevronDown, Edit } from "lucide-react-native";
import { Loan } from "~/types/Loan";
import { DebtorName } from "~/components/debtor-name";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/ui/collapsible";
interface CreatedLoanWrapperProps extends ViewProps {
  title: string;
  loans: Loan[];
}

const CreatedLoanWrapper = ({
  title,
  loans,
  className,
  ...props
}: CreatedLoanWrapperProps) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      className={cn("min-h-auto max-h-[40vh]")}
    >
      <CollapsibleTrigger className="flex flex-row justify-between bg-muted rounded-2xl py-3 px-4">
        <View className="flex flex-row gap-2 ">
          <Text className={cn(PARAGRAPH)}>{title}</Text>
          <Text className={cn(LABEL, "text-gray-500")}>
            ทั้งหมด {loans.length} คน
          </Text>
        </View>
        <ChevronDown color="gray" className={isOpen ? "rotate-180" : ""} />
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <FlatList
          data={loans}
          contentContainerStyle={{ gap: 4 }}
          renderItem={(item) => <CreatedLoanCard loan={item.item} />}
          keyExtractor={(item) => item.id}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

const CreatedLoanCard = ({ loan }: { loan: Loan }) => {
  return (
    <View className="flex flex-row gap-4 border border-muted rounded-2xl py-2 px-4 justify-between items-center">
      <View className="flex flex-col gap-1">
        <DebtorName
          name={loan.name || "ลูกหนี้นิรนาม"}
          nickname={loan.nickname}
        />
        {loan.total && loan.totalLoanTerm && (
          <Text className={cn(PARAGRAPH, "text-gray-500")}>
            {loan.total} บาท • {loan.totalLoanTerm} งวด
          </Text>
        )}
      </View>
      <Button size="icon" variant="ghost">
        <Edit color="gray" size={20} />
      </Button>
    </View>
  );
};

export default CreatedLoanWrapper;
