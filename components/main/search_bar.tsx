import { View, Text } from "react-native";
import React from "react";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "../icon";
import SeachbarOnly from "./seachbar-only";

export const Searchbar = ({
  toggleView,
  isGridView,
  onSearch,
  value,
  toggleValue,
  onToggleChange,
}: {
  toggleView: () => void;
  isGridView: boolean;
  onSearch: (query: string) => void;
  value: string;
  toggleValue: string;
  onToggleChange: (value: string) => void;
}) => {
  const handleSearchChange = (query: string) => {
    onSearch(query);
  };

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
                <Icon name="Filter" size={16} />
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
            name={isGridView ? "List" : "LayoutGrid"}
            size={16}
            color="#71717a"
          />
        </Button>
      </View>
    </View>
  );
};

export default Searchbar;
