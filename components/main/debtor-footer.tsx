import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { cn } from "~/lib/utils";
import { LABEL, PARAGRAPH } from "~/constants/Typography";
import { GRID, GRID_COL_SPAN, GRID_ROW } from "~/constants/Styles";

interface AdditionalInfoProps {
  address: string;
  debtorType: string;
  tag: string[]; // Change tag type to array of strings
  notes: string;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  address,
  debtorType,
  tag,
  notes,
}) => {
  return (
    <View className="flex flex-col gap-4">
      <View className="flex flex-col gap-4">
        <Text>ข้อมูลเพิ่มเติม</Text>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      {/* <View>
        <Text className={cn(LABEL, "text-[#808080]")}>ที่อยู่</Text>
        <Text className={cn(PARAGRAPH, "text-foreground")}>{address}</Text>
      </View> */}

      <View className={cn(GRID, "")}>
        <View className={cn(GRID_ROW, "")}>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>ประเภทลูกหนี้</Text>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {debtorType}
            </Text>
          </View>
          <View className={cn(GRID_COL_SPAN[1], "")}>
            <Text className={cn(LABEL, "text-[#808080]")}>แท็ก</Text>
            <View className="flex flex-row flex-wrap gap-2 mt-1">
              {tag.map((item, index) => (
                <View
                  key={index}
                  className="bg-[#E7F7F6] px-4 py-2 rounded-full"
                >
                  <Text className={cn(PARAGRAPH, "text-[#808080]")}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View className="flex flex-col">
        <Text className={cn(LABEL, "text-[#808080]")}>โน๊ตเพิ่มเติม</Text>
        <Text className={cn(PARAGRAPH, "text-foreground")}>{notes}</Text>
      </View>
    </View>
  );
};

export default AdditionalInfo;
