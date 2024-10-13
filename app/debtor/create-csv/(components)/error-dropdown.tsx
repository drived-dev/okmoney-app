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
import { Button } from "~/components/ui/button";

const ErrorDropdown = ({ error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(error);
  console.log("hello is there");
  return (
    <Collapsible open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <CollapsibleTrigger className="">
        <FormMessage className={cn(isOpen && "rounded-b-none")}>
          <Text className={cn(PARAGRAPH)}>
            เกิดข้อผิดพลาดใน {Object.keys(error)[0]}
          </Text>

          <ChevronDown color="gray" className={isOpen ? "rotate-180" : ""} />
        </FormMessage>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex-col gap-2 bg-red-300/40 px-2 py-2 rounded-b-xl rounded-tr-xl">
        {Object.values(error)[0].map((value) => {
          return (
            <View className="p-2 rounded-lg bg-white/40">
              <Text className={cn(PARAGRAPH)}>{value}</Text>
            </View>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

const styles = StyleSheet.create({});

export default ErrorDropdown;
