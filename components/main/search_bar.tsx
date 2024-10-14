import { View, Text } from "react-native";
import React from "react";
import { Button } from "../ui/button"; // Assuming you have a Button component
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group"; // Assuming you're using a ToggleGroup
import { cn } from "~/lib/utils"; // Utility function for classnames
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "../icon"; // Assuming you have an Icon component
import SeachbarOnly from "./seachbar-only"; // Assuming you have a separate search input component

export const Searchbar = ({
  toggleView,
  isGridView,
  onSearch,
  value, // Synchronized search query
  toggleValue, // Synchronized toggle filter
  onToggleChange, // Handler for toggle filter changes
}: {
  toggleView: () => void;
  isGridView: boolean;
  onSearch: (query: string) => void;
  value: string; // Value for the search input field
  toggleValue: string; // The current filter value
  onToggleChange: (value: string) => void; // Function to change the filter
}) => {
  const handleSearchChange = (query: string) => {
    onSearch(query); // Call the parent handler to update the search query
  };

  return (
    <View className="flex flex-col gap-3">
      {/* SearchbarOnly component for the search input */}
      <SeachbarOnly value={value} onChangeText={handleSearchChange} />

      {/* Filter and Toggle controls */}
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row gap-3">
          <ToggleGroup
            value={toggleValue} // Sync toggle state with the parent
            onValueChange={onToggleChange} // Handle filter change
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
