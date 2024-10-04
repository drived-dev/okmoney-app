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
import ContextMenu from "react-native-context-menu-view";

export interface TagsInputProps {
  selectedTags: string[];
  onChange: (value: string[] | undefined) => void;
}

export const TagsInput = ({ selectedTags, onChange }: TagsInputProps) => {
  //TODO: implement state managment (redux?)
  const [tags, setTags] = React.useState(["friend"]);

  return (
    <View>
      <ToggleGroup
        value={selectedTags}
        onValueChange={onChange}
        type="multiple"
        className="justify-start flex-wrap"
      >
        {tags.map((tag) => (
          <ContextMenu
            actions={[
              {
                title: "Delete Tag",
                destructive: true,
                icon: "trash",
              },
            ]}
            onPress={(e) => {
              if (e.nativeEvent.name === "Delete Tag")
                setTags((prev) => prev.filter((t) => t !== tag));
            }}
          >
            <ToggleGroupItem key={tag} value={tag} aria-label={tag}>
              <Text className={cn(PARAGRAPH)}>{tag}</Text>
            </ToggleGroupItem>
          </ContextMenu>
        ))}
        <AddTagButton tags={tags} setTags={setTags} />
      </ToggleGroup>
    </View>
  );
};

const AddTagButton = ({ tags, setTags }) => {
  const [selected, setSelected] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<TextInput>(null);

  function handleSelect() {
    setSelected(true);
    inputRef.current?.focus();
  }

  function handleDeselect() {
    setSelected(false);
    setInputValue("");
    inputRef.current?.blur();
  }

  function addTag() {
    handleDeselect();
    //TODO: add tags to context
    setTags([...tags, inputValue]);

    setInputValue("");
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
        value={inputValue}
        onChangeText={setInputValue}
        className={cn(selected ? "block" : "hidden")}
        onBlur={handleDeselect}
        onSubmitEditing={addTag}
      />
    </View>
  );
};
