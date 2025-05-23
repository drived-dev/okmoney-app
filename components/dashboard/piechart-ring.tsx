import React from "react";
import { View, Text } from "react-native";
import PieChart from "react-native-pie-chart";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";

// Define interface for the component's props
interface DashboardCardProps {
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  categories: string[];
  direction?: "row" | "col"; // New prop to control layout direction
}

const DashboardCardRing: React.FC<DashboardCardProps> = ({
  widthAndHeight,
  series,
  sliceColor,
  categories,
  direction = "row", // Default value is "row"
}) => {
  const seriesWithBath = series.map(
    (value) => `${new Intl.NumberFormat().format(value)} คน`
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
              sliceColor={["#E5E7EB"]} // Using Tailwind gray-200 color
              coverRadius={0.65}
            />
          </View>
          <Text
            className={cn(
              PARAGRAPH_BOLD,
              "absolute text-center font-bold text-lg -translate-y-1/2"
            )}
            style={{ top: widthAndHeight / 1.75 }}
          >
            0 คน
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
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
            coverRadius={0.65}
          />
          <Text
            className={cn(
              PARAGRAPH_BOLD,
              "absolute text-center font-bold text-lg -translate-y-1/2"
            )}
            style={{ top: widthAndHeight / 2 }}
          >
            {series[0] && `${new Intl.NumberFormat().format(series[0])} คน`}
          </Text>
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

export default DashboardCardRing;
