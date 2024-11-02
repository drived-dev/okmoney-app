import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "../icon";
import { X, User, Star, Home } from "lucide-react-native"; // Import X icon and other icons
import SeachbarOnly from "./seachbar-only";
import useFilterStore from "~/store/use-filter-store";

// Icon mapping based on tag names
const tagIcons = {
  friend: <User size={12} color="#333" />,
  family: <Home size={12} color="#333" />,
  favorite: <Star size={12} color="#333" />,
  // Add more tags and icons as needed
};

export const Searchbar = ({
  toggleView,
  isGridView,
  onSearch,
  value,
  toggleValue,
  onToggleChange,
}) => {
  const handleSearchChange = (query) => {
    onSearch(query);
  };

  // Get tags and removeTag function from useTagStore
  const { tags, removeTag } = useFilterStore();

  return (
    <View className="flex flex-col gap-3">
      {/* Searchbar input */}
      <SeachbarOnly value={value} onChangeText={handleSearchChange} />

      {/* Filter and Toggle controls */}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-3">
          <ToggleGroup
            value={toggleValue}
            onValueChange={onToggleChange} // Calls onToggleChange when toggles are changed
            type="single"
          >
            <ToggleGroupItem value="all" aria-label="Toggle all">
              <Text
                className={cn(
                  PARAGRAPH,
                  "pt-2 font-ibm text-base leading-6 text-foreground"
                )}
              >
                ทั้งหมด
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="old" aria-label="Toggle old">
              <Text
                className={cn(
                  PARAGRAPH,
                  "pt-2 font-ibm text-base leading-6 text-foreground"
                )}
              >
                ลูกหนี้เก่า
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="filter" aria-label="Toggle filter">
              <View className="flex flex-row gap-1 items-center">
                <Icon name="Filter" size={20} />
                <Text
                  className={cn(
                    PARAGRAPH,
                    "pt-2 font-ibm text-base leading-6 text-foreground"
                  )}
                >
                  กรอง
                </Text>
              </View>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        {/* Grid/List View Toggle Button */}
        <Button variant="ghost" size="icon" onPress={toggleView}>
          <Icon
            name={isGridView ? "Rows3" : "LayoutGrid"}
            size={20}
            color="#71717a"
          />
        </Button>
      </View>

      {/* Display tags if toggleValue is "filter" */}
      {toggleValue === "filter" && (
        <View className="flex flex-row flex-wrap gap-2 items-center">
          {tags.length > 0 &&
            tags.map((tag, index) => (
              <View
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-md flex flex-row items-center p-4"
              >
                {/* Display the icon before the text, using the tagIcons mapping */}
                {tagIcons[tag] && <View className="mr-2">{tagIcons[tag]}</View>}
                <Text className={cn(PARAGRAPH, "text-foreground mr-2 mt-1")}>
                  {tag}
                </Text>
                {/* Cross icon to remove the tag */}
                <TouchableOpacity onPress={() => removeTag(tag)}>
                  <View className="bg-gray-500 rounded-2xl p-1">
                    <X size={12} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </View>
      )}
    </View>
  );
};

export default Searchbar;
