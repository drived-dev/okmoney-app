import React from "react";
import { View, Text, Image } from "react-native";
import PieChart from "react-native-pie-chart";
import { IconButton } from "~/components/icon-button";
import { ArrowRight } from "lucide-react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";
import { router } from "expo-router";
import { TrendingUp, TrendingDown } from "lucide-react-native";
// Define interface for the component's props
interface DashboardCardProps {
  userName: string;
  totalMoney: string;
  changeAmount: number;
  changePercentage: string;
  isPositive: boolean;
  widthAndHeight: number;
  series: number[];
  sliceColor: string[];
  categories: string[];
  direction?: "row" | "col"; // New prop to control layout direction
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  userName,
  totalMoney,
  changeAmount,
  changePercentage,
  isPositive,
  widthAndHeight,
  series,
  sliceColor,
  categories,
  direction = "row", // Default value is "row"
}) => {
  // const total = series.reduce((sum, value) => sum + value, 0);
  // const seriesWithPercentage = series.map(
  //   (value) => ((value / total) * 100).toFixed(2) + "%"
  // );
  const seriesm = series.map((value) => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + " ล้าน";
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + " แสน";
    } else if (value >= 10000) {
      return (value / 10000).toFixed(1) + " หมื่น";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + " พัน";
    }
    return value.toString();
  });

  return (
    <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
      <View className="mb-4">
        <Text className={cn(PARAGRAPH_BOLD, "text-gray-500")}>
          สวัสดี, {userName}
        </Text>
        <Text className={cn(TITLE, "")}>{totalMoney} บาท</Text>

        {/* Conditional color based on positive/negative change */}
        <Text
          className={cn(PARAGRAPH_BOLD, "-mt-2")}
          style={{ color: isPositive ? "green" : "red" }}
        >
          {isPositive ? (
            <TrendingUp color="green" size={20} className="ml-2" />
          ) : (
            <TrendingDown color="red" size={20} className="mr-2" />
          )}{" "}
          {Math.abs(
            Number(String(changeAmount).replace(/[^0-9.-]/g, ""))
          ).toLocaleString()}{" "}
          บาท ({isPositive ? "+" : "-"}
          {changePercentage}%)
        </Text>
      </View>

      <View
        className={cn(
          "gap-2",
          direction === "row"
            ? "flex-row justify-between"
            : "flex-col items-center"
        )}
      >
        <PieChart
          widthAndHeight={widthAndHeight}
          series={
            series.reduce((a, b) => a + b, 0) == 0 ? [1, 0, 0, 0] : series
          }
          sliceColor={sliceColor}
        />
        <View className={cn("flex-1", direction === "row" ? "ml-4" : "mt-4")}>
          {categories.map((label, index) => (
            <View key={index} className="flex flex-row items-center mb-2">
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: sliceColor[index],
                  borderRadius: 4, // Set to 8 for round indicators
                  marginRight: 8,
                }}
              />
              <Text className={cn(PARAGRAPH, "")}>{label}</Text>
              <Text
                className={cn(PARAGRAPH, "")}
                style={{ marginLeft: "auto" }}
              >
                {seriesm[index]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View>
        <IconButton
          onPress={() => router.navigate("/dashboard-info/index")}
          icon={<ArrowRight />}
          text="ดูภาพรวมทั้งหมด"
          iconPosition="right"
        />
      </View>
    </View>
  );
};

export default DashboardCard;
