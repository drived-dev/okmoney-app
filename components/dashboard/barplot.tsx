import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ruleTypes } from "gifted-charts-core";

// Accept toggleValue as a prop
const BarPairWithLine = ({ toggleValue }) => {
  // Set data based on the toggle value
  const data =
    toggleValue === "years"
      ? [
          { value: 2500, frontColor: "#006DFF", spacing: 0, label: "2024" },
          { value: 2400, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          { value: 3500, frontColor: "#006DFF", spacing: 0, label: "2025" },
          { value: 3000, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: 4500,
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: "2026",
          },
          { value: 4000, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: 5200,
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: "2027",
          },
          { value: 4900, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: 3000,
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: "2028",
          },
          { value: 2800, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
        ]
      : [
          { value: 200, frontColor: "#006DFF", spacing: 0, label: "Jan" },
          { value: 300, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          { value: 500, frontColor: "#006DFF", spacing: 0, label: "Feb" },
          { value: 400, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: 700,
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: "Mar",
          },
          { value: 600, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: 800,
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: "Apr",
          },
          { value: 750, frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
        ];

  return (
    <View className="bg-background justify-center ">
      <BarChart
        data={data}
        barWidth={20}
        initialSpacing={20}
        spacing={20}
        barBorderRadius={4}
        yAxisThickness={0}
        xAxisType={ruleTypes.DASHED}
        xAxisColor={"gray"}
        yAxisTextStyle={{ color: "gray" }}
        maxValue={6000}
        labelWidth={40}
        noOfSections={3}
        xAxisLabelTextStyle={{ color: "gray", textAlign: "center" }}
      />
    </View>
  );
};

export default BarPairWithLine;
