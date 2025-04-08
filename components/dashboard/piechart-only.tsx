import React from "react";
import { View, Text, Image } from "react-native";
import PieChart from "react-native-pie-chart";
import { IconButton } from "~/components/icon-button";
import { ArrowRight } from "lucide-react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";
import { router } from "expo-router";

// Define interface for the component's props
interface DashboardCardProps {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  categories: string[];
  direction?: "row" | "col"; // New prop to control layout direction
}

const DashboardCardOnly: React.FC<DashboardCardProps> = ({
  widthAndHeight,
  series,
  sliceColor,
  categories,
  direction = "row", // Default value is "row"
}) => {
  const seriesWithBath = series.map(
    (value) => `${new Intl.NumberFormat().format(value)} บาท`
  );

  // Add check for zero sum
  const seriesSum = series.reduce((acc, curr) => acc + curr, 0);
  if (seriesSum === 0) {
    return (
      <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
        <Text className={cn(TITLE, "")}>ประเภทลูกหนี้</Text>
        <View className="items-center justify-center p-4">
          <View className="relative items-center justify-center">
            <PieChart
              widthAndHeight={widthAndHeight}
              series={[1]}
              sliceColor={["#E5E7EB"]}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2 flex-1">
      <Text className={cn(TITLE, "")}>ประเภทลูกหนี้</Text>

      <View
        className={cn(
          "gap-4",
          direction === "row"
            ? "flex-row justify-between"
            : "flex-col items-center"
        )}
      >
        <View className="relative items-center justify-center">
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          />
        </View>

        <View className={cn("flex-1", direction === "row" ? "ml-4" : "mt-4")}>
          {categories.map((label, index) => (
            <View
              key={index}
              className="flex flex-row items-center mb-2 w-full justify-between"
            >
              <View
                className="w-4 h-4 mr-2"
                style={{
                  backgroundColor: sliceColor[index],
                  borderRadius: 4,
                }}
              />

              <Text className={cn(PARAGRAPH, "")}>{label}</Text>
              <Text className={cn(PARAGRAPH, "ml-auto")}>
                {seriesWithBath[index]}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DashboardCardOnly;
