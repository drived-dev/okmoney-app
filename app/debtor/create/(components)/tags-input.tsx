import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
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
  setSelectedTags: (value: string[] | undefined) => void;
}

export const TagsInput = ({
  selectedTags,
  setSelectedTags,
}: TagsInputProps) => {
  //TODO: implement state managment (redux?)
  const [tags, setTags] = React.useState(["friend"]);

  function deleteTag(tag) {
    Alert.alert(
      "ลบตัวกรอง",
      "การลบตัวกรองจะลบสำหรับทุกลูกหนี่ที่มีตัวกรองนี้อยู่ด้วย",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setTags((prev) => prev.filter((t) => t !== tag));
          },
        },
      ]
    );
  }

  return (
    <View>
      <ToggleGroup
        value={selectedTags}
        onValueChange={setSelectedTags}
        type="multiple"
        className="justify-start flex-wrap"
      >
        {tags.map((tag) => (
          <ContextMenu
            key={tag}
            actions={[
              {
                title: "Delete Tag",
                destructive: true,
                icon: "trash",
              },
            ]}
            onPress={(e) => {
              if (e.nativeEvent.name === "Delete Tag") deleteTag(tag);
            }}
          >
            <ToggleGroupItem value={tag} aria-label={tag}>
              <Text className={cn(PARAGRAPH)}>{tag}</Text>
            </ToggleGroupItem>
          </ContextMenu>
        ))}
        <AddTagButton
          tags={tags}
          setTags={setTags}
          setSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
      </ToggleGroup>
    </View>
  );
};

const AddTagButton = ({ tags, setTags, setSelectedTags, selectedTags }) => {
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
    const formattedValue = inputValue.trim().toLowerCase();

    if (formattedValue === "") return;
    if (tags.includes(formattedValue)) return;

    handleDeselect();
    setSelectedTags([...(selectedTags ?? []), formattedValue]);

    //TODO: add tags to context
    setTags([...tags, formattedValue]);
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
        placeholder="เพิ่มตัวกรอง"
        value={inputValue}
        onChangeText={setInputValue}
        className={cn(selected ? "block" : "hidden")}
        onBlur={handleDeselect}
        onSubmitEditing={addTag}
      />
    </View>
  );
};
