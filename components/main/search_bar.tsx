import { View, Text } from "react-native";
import React from "react";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"; // Assuming you're using these
import { cn } from "~/lib/utils"; // Utility function for classnames
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "../icon"; // Assuming an icon component
import SeachbarOnly from "./seachbar-only";

export const Searchbar = ({
  toggleView,
  isGridView,
  onSearch,
}: {
  toggleView: () => void;
  isGridView: boolean;
  onSearch: (query: string) => void;
}) => {
  const [value, setValue] = React.useState<string>("");

  const handleSearchChange = (query: string) => {
    setValue(query);
    onSearch(query);
  };

  return (
    <View className="flex flex-col gap-3">
      {/* SeachbarOnly component for the search bar */}
      <SeachbarOnly value={value} onChangeText={handleSearchChange} />

      {/* Filter and Toggle controls */}
      <View className="flex flex-row justify-between">
        <View className="flex flex-row gap-3">
          <ToggleGroup
            value={value}
            onValueChange={(val: string | undefined) => {
              if (val) {
                setValue(val);
              }
            }}
            type="single"
          >
            <ToggleGroupItem value="all" aria-label="Toggle all">
              <Text className={cn(PARAGRAPH, "pt-2 font-ibm text-foreground")}>
                ทั้งหมด {/* "All" in Thai */}
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="old" aria-label="Toggle old">
              <Text className={cn(PARAGRAPH, "pt-2 font-ibm text-foreground")}>
                ลูกหนี้เก่า {/* "Old Debtors" in Thai */}
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="filter" aria-label="Toggle filter">
              <View className="flex flex-row gap-1">
                <View className="mt-3">
                  <Icon name="Filter" size={16} />
                </View>
                <Text
                  className={cn(PARAGRAPH, "pt-2 font-ibm text-foreground")}
                >
                  กรอง {/* "Filter" in Thai */}
                </Text>
              </View>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>

        {/* Toggle view button (List/Grid toggle) */}
        <Button
          variant="ghost"
          size="icon"
          className="mt-1"
          onPress={toggleView}
        >
          <Icon name={isGridView ? "List" : "LayoutGrid"} size={16} />
        </Button>
      </View>
    </View>
  );
};
