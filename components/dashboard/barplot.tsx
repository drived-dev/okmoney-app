import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { ruleTypes } from "gifted-charts-core";

// Function to format date to a year string (e.g., "2024")
const getYearLabel = (date) => date.getFullYear();

// Function to format date to a month string (e.g., "Jan", "Feb")
const getMonthLabel = (date) => date.toLocaleString("default", { month: "short" });

// Accept toggleValue as a prop
const BarPairWithLine = ({ toggleValue, seriesYear, seriesMonth, year, month }) => {
  // Calculate the last 5 years or months based on the year and month params
  const currentYear = new Date(year); // Convert to Date object
  const last5Years = [...Array(5)].map((_, i) => {
    const yearDate = new Date(currentYear);
    yearDate.setFullYear(currentYear.getFullYear() - i); // Subtract years
    return getYearLabel(yearDate);
  });

  const currentMonth = new Date(month);
  const last5Months = [...Array(5)].map((_, i) => {
    const monthDate = new Date(currentMonth);
    monthDate.setMonth(currentMonth.getMonth() - i); // Subtract months
    return getMonthLabel(monthDate);
  });

  const maxYearValue = Math.max(...seriesYear);
  const maxMonthValue = Math.max(...seriesMonth);

  // Set data based on the toggle value
  const data =
    toggleValue === "years"
      ? [
          { value: seriesYear[0], frontColor: "#006DFF", spacing: 0, label: last5Years[4] },
          { value: seriesYear[1], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          { value: seriesYear[2], frontColor: "#006DFF", spacing: 0, label: last5Years[3] },
          { value: seriesYear[3], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: seriesYear[4],
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: last5Years[2],
          },
          { value: seriesYear[5], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: seriesYear[6],
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: last5Years[1],
          },
          { value: seriesYear[7], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: seriesYear[8],
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: last5Years[0],
          },
          { value: seriesYear[9], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
        ]
      : [
          { value: seriesMonth[0], frontColor: "#006DFF", spacing: 0, label: last5Months[3] },
          { value: seriesMonth[1], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          { value: seriesMonth[2], frontColor: "#006DFF", spacing: 0, label: last5Months[2] },
          { value: seriesMonth[3], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: seriesMonth[4],
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: last5Months[1],
          },
          { value: seriesMonth[5], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
          {
            value: seriesMonth[6],
            frontColor: "#006DFF",
            gradientColor: "#009FFF",
            spacing: 0,
            label: last5Months[0],
          },
          { value: seriesMonth[7], frontColor: "#3BE9DE", gradientColor: "#93FCF8" },
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
        maxValue={toggleValue === "years" ? maxYearValue : maxMonthValue}
        labelWidth={40}
        noOfSections={3}
        xAxisLabelTextStyle={{ color: "gray", textAlign: "center" }}
      />
    </View>
  );
};

export default BarPairWithLine;
