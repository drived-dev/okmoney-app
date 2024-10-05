import { View, Text } from "react-native";
import React from "react";
import PhoneInput from "../phone-input";
import { Button } from "../ui/button";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import { cn } from "~/lib/utils";
import { HEADER, PARAGRAPH, TITLE } from "~/constants/Typography";
import { Icon } from "../icon";

export const Searchbar = () => {
  const [value, setValue] = React.useState<string>();
  return (
    <View className="flex flex-col gap-3">
      <View>
        <PhoneInput></PhoneInput>
      </View>
      <View className="justify-between flex flex-row ">
        <View className="flex flex-row gap-3">
          <ToggleGroup value={value} onValueChange={setValue} type="single">
            <ToggleGroupItem value="all" aria-label="Toggle all">
              <Text
                className={(cn(PARAGRAPH), "pt-2 font-ibm text-base leading-6")}
              >
                ทั้งหมด
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="old" aria-label="Toggle old">
              <Text
                className={(cn(PARAGRAPH), "pt-2 font-ibm text-base leading-6")}
              >
                ลูกหนี้เก่า
              </Text>
            </ToggleGroupItem>
            <ToggleGroupItem value="filter" aria-label="Toggle underline">
              <View className="flex flex-row gap-1">
                <View className="mt-3">
                  <Icon name="Filter" size={16} />
                </View>
                <View>
                  <Text
                    className={
                      (cn(PARAGRAPH), "pt-2 font-ibm text-base leading-6")
                    }
                  >
                    กรอง
                  </Text>
                </View>
              </View>
            </ToggleGroupItem>
          </ToggleGroup>
        </View>
        <View>
          <Button variant="ghost" size={"icon"} className="mt-1">
            <Icon name="LayoutGrid" size={16} color="#71717a" />
          </Button>
        </View>
      </View>
    </View>
  );
};
