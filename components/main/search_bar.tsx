import { View, Text } from "react-native";
import React from "react";
import PhoneInput from "../phone-input";
import { Button } from "../ui/button";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";
import { PARAGRAPH } from "~/constants/Typography";
import { Icon } from "../icon";

export const Searchbar = ({
  toggleView,
  isGridView,
}: {
  toggleView: () => void;
  isGridView: boolean;
}) => {
  const [value, setValue] = React.useState<string>();

  return (
    <View className="flex flex-col gap-3">
      <View>
        <PhoneInput></PhoneInput>
      </View>
      <View className="justify-between flex flex-row">
        <View className="flex flex-row gap-3">
          <ToggleGroup value={value} onValueChange={setValue} type="single">
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
              <View className="flex flex-row gap-1">
                <View className="mt-3">
                  <Icon name="Filter" size={16} />
                </View>
                <View>
                  <Text
                    className={cn(
                      PARAGRAPH,
                      "pt-2 font-ibm text-base leading-6 text-foreground"
                    )}
                  >
                    กรอง
                  </Text>
                </View>
              </View>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
        <View>
          {/* Toggle view button */}
          <Button
            variant="ghost"
            size={"icon"}
            className="mt-1"
            onPress={toggleView}
          >
            <Icon
              name={isGridView ? "List" : "LayoutGrid"}
              size={16}
              color="#71717a"
            />
          </Button>
        </View>
      </View>
    </View>
  );
};
