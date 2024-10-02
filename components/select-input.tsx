import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";

export interface SelectInputChoices {
  value: string;
  alias: string;
}

export interface SelectInputProps {
  choices: SelectInputChoices[];
  value: string;
  onChange: (value: string | undefined) => void;
}

const SelectInput = ({ choices, value, onChange }: SelectInputProps) => {
  return (
    <View>
      <ToggleGroup
        value={value}
        onValueChange={onChange}
        type="single"
        className="justify-start flex-wrap"
      >
        {choices.map((choice) => (
          <ToggleGroupItem value={choice.value} aria-label={choice.value}>
            <Text className={cn(PARAGRAPH)}>{choice.alias}</Text>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </View>
  );
};

export default SelectInput;

const styles = StyleSheet.create({});
