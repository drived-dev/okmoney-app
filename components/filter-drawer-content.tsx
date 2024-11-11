import { cn } from "~/lib/utils";
import { PARAGRAPH, LABEL, PARAGRAPH_BOLD } from "~/constants/Typography";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { CONTAINER } from "~/constants/Styles";
import { Icon } from "./icon";
import useUserStore from "~/store/use-user-store";

interface FilterDrawerContentProps {
  setDrawerOpen: (open: boolean) => void;
  tagValue: string[];
  setTagValue: (value: string[]) => void;
  statusValue: string[];
  setStatusValue: (value: string[]) => void;
  handleConfirm: () => void;
}

export default function FilterDrawerContent({
  setDrawerOpen,
  tagValue,
  setTagValue,
  statusValue,
  setStatusValue,
  handleConfirm,
}: FilterDrawerContentProps) {
  const { tags } = useUserStore();
  return (
    <View className={cn(CONTAINER, "bg-background h-full")}>
      <SafeAreaView>
        <View className="flex flex-col gap-4">
          <Text className={cn(PARAGRAPH, "")}>ค้นหาด้วยฟิวเตอร์</Text>
          <View className="h-px bg-gray-400" />
          <View>
            <FilterSection
              value={tagValue}
              onValueChange={setTagValue}
              icon="Tag"
              label="แท็ก"
              items={tags}
            />
          </View>
          <View className="h-px bg-gray-400" />
          <View>
            <FilterSection
              value={statusValue}
              onValueChange={setStatusValue}
              icon="CircleCheckBig"
              label="สถานะ"
              items={["ค้างชำระ", "ใกล้กำหนด", "รอชำระ"]}
            />
          </View>
        </View>
      </SafeAreaView>

      <View className={cn(CONTAINER, "mt-auto px-4 w-full")}>
        <View className="flex flex-row gap-2 ">
          <Button
            variant="outline"
            size={"xl"}
            onPress={() => setDrawerOpen(false)}
          >
            <Text className={cn(PARAGRAPH_BOLD, "items-center")}>ยกเลิก</Text>
          </Button>
          <Button variant="destructive" size={"xl"} onPress={handleConfirm}>
            <Text className={cn(PARAGRAPH_BOLD, "items-center")}>ตกลง</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

interface FilterSectionProps {
  value: string[];
  onValueChange: (value: string[]) => void;
  icon: string;
  label: string;
  items: string[];
}

function FilterSection({
  value,
  onValueChange,
  icon,
  label,
  items,
}: FilterSectionProps) {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row gap-1 items-center">
        <Icon name={icon} size={16} />
        <Text className={cn(LABEL, "")}>{label}</Text>
      </View>
      <View>
        <ToggleGroup
          value={value}
          onValueChange={(value) => onValueChange(value ? [value] : [])}
          type="single"
          className="flex flex-col gap-2"
        >
          {items.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              aria-label={`Toggle ${item}`}
              className="w-full"
            >
              <Text
                className={cn(
                  PARAGRAPH,
                  "pt-2 font-ibm text-base leading-6 text-foreground"
                )}
              >
                {item}
              </Text>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </View>
    </View>
  );
}
