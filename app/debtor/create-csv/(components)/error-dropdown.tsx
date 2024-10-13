import { ChevronDown } from "lucide-react-native";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "~/components/ui/collapsible";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { FormMessage } from "~/components/form";

const ErrorDropdown = ({ error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <CollapsibleTrigger className="">
        <FormMessage>
          <Text className={cn(PARAGRAPH)}>
            เกิดข้อผิดพลาดใน {Object.keys(error)[0]}
          </Text>
          <ChevronDown color="gray" className={isOpen ? "rotate-180" : ""} />
        </FormMessage>
      </CollapsibleTrigger>
      <CollapsibleContent className="max-h-[30vh] mt-2">
        <Text className={cn(PARAGRAPH)}>{error[Object.keys(error)[0]]}</Text>
      </CollapsibleContent>
    </Collapsible>
  );
};

const styles = StyleSheet.create({});

export default ErrorDropdown;
