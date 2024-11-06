import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface BarPairChartProps {
  data: { year: string; values: number[] }[];
  colors: string[];
  labels: string[];
}

const BarPairChart: React.FC<BarPairChartProps> = ({
  data,
  colors,
  labels,
}) => {
  // Prepare data for BarChart
  const formattedData = data.map((entry) => ({
    stacks: entry.values.map((value, index) => ({
      value,
      color: colors[index],
      label: labels[index],
    })),
    label: entry.year,
  }));

  return (
    <View className="p-4">
      <Text className="text-lg font-bold text-center mb-4">
        Annual Overview
      </Text>
      <BarChart
        data={formattedData}
        stackData // Enable stacked data to create grouped bars
        barWidth={20}
        barSpacing={15}
        roundedTop
        roundedBottom
        yAxisTextStyle={{ color: "grey", fontSize: 12 }}
        xAxisLabelTextStyle={{ color: "grey", fontSize: 12 }}
        xAxisTextNumberOfLines={1}
        yAxisLabelWidth={40}
        yAxisOffset={30}
        xAxisOffset={15}
        initialSpacing={10}
        showFractionalValues
        hideOrigin
        yAxisLabelFormatter={(value) => `${(value / 1e9).toFixed(1)}B`} // Display in billions
      />
      <View className="flex-row justify-center mt-4">
        {labels.map((label, index) => (
          <View key={index} className="flex-row items-center mx-2">
            <View
              className={`w-4 h-4 mr-2 ${
                index === 0 ? "bg-[#fbd203]" : "bg-[#ff9100]"
              }`}
            />
            <Text className="text-xs">{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default BarPairChart;
