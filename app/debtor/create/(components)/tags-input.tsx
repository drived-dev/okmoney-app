import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Plus } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

const tags = ["friend", "mom"]; //TODO: implement state managment (redux?)

export interface TagsInputProps {
  selectedTags: string[];
  onChange: (value: string[] | undefined) => void;
}

export const TagsInput = ({ selectedTags, onChange }: TagsInputProps) => {
  return (
    <View>
      <ToggleGroup
        value={selectedTags}
        onValueChange={onChange}
        type="multiple"
        className="justify-start flex-wrap"
      >
        {tags.map((tag) => (
          <ToggleGroupItem key={tag} value={tag} aria-label={tag}>
            <Text className={cn(PARAGRAPH)}>{tag}</Text>
          </ToggleGroupItem>
        ))}
        <AddTagButton />
      </ToggleGroup>
    </View>
  );
};

const AddTagButton = () => {
  const [selected, setSelected] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  function handleSelect() {
    setSelected(true);
    inputRef.current?.focus();
  }

  function handleDeselect() {
    setSelected(false);
    inputRef.current?.blur();
  }

  return (
    <View className="flex flex-row items-center">
      <Button
        variant="ghost"
        size="icon"
        onPress={handleSelect}
        className={cn(!selected ? "block" : "hidden")}
      >
        <Plus color="black" size={16} />
      </Button>
      <Input
        ref={inputRef}
        className={cn(selected ? "block" : "hidden")}
        onBlur={handleDeselect}
      />
    </View>
  );
};
