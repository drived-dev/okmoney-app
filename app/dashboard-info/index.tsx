import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { TITLE } from "~/constants/Typography";
import DashboardCardOnly from "~/components/dashboard/piechart-only";

const widthAndHeight = 200;
const series = [1000, 200, 3000, 400];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
const categories = [
  "ยอดปล่อยทั้งหมด",
  "ยอดที่ชำระ",
  "ยอดที่ต้องเก็บ",
  "ดอกเบี้ยที่ได้รับ",
];

const index = () => {
  return (
    <View>
      <ScrollView>
        <SafeAreaView className="h-full">
          <View className={cn(CONTAINER, "flex flex-col gap-4 mt-4")}>
            <Text className={cn(TITLE, "")}>ประเภทลูกหนี้</Text>
            <View className="flex">
              <DashboardCardOnly
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                categories={categories}
                direction="col"
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default index;
