import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { TITLE } from "~/constants/Typography";
import DashboardCardOnly from "~/components/dashboard/piechart-only";
import { IconButton } from "~/components/icon-button";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";
import DashboardCardRing from "~/components/dashboard/piechart-ring";
import { getDashboardAll } from "~/api/dashboard/get-dashboard-all";
import { useQuery } from "@tanstack/react-query";
import { getDashboardDebtors } from "~/api/dashboard/get-dashboard-debtors";
import CloseButton from "~/components/close-button";

const handleBack = () => {
  if (router.canGoBack()) {
    // If there's a previous page, go back
    router.back();
  } else {
    // Otherwise, navigate to a fallback route (e.g., "Home")
    router.navigate("/");
  }
};

const widthAndHeight = 200;
//const series = [1000, 200, 3000, 400];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
const categories = [
  "ยอดปล่อยทั้งหมด",
  "ยอดที่ชำระ",
  "ยอดที่ต้องเก็บ",
  "ดอกเบี้ยที่ได้รับ",
];

const widthAndHeight2 = 200;
//const series2 = [62, 51, 11];
const sliceColor2 = ["#fbd203", "#ffb300", "#ff9100"];
const categories2 = [
  "จำนวนลูกหนี้ทั้งหมด",
  "ลูกหนี้ค้างชำระ",
  "ลูกหนี้ที่ปิดยอดไปแล้ว",
];

const index = () => {
  const { data: dashboard = [] } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getDashboardAll(),
  });

  const { data: dashboardDebtors = [] } = useQuery({
    queryKey: ["dashboardDebtors"],
    queryFn: () => getDashboardDebtors(),
  });

  // Add default values of 0 and ensure numbers, filtering out null/undefined
  const series = [
    dashboard.totalLoan,
    dashboard.accuredIncome,
    dashboard.totalEarned,
    dashboard.profit,
  ].map((val) => Number(val) || 0);

  const series2 = [
    dashboardDebtors.totalDebtors,
    dashboardDebtors.currentDebtors,
    dashboardDebtors.clearedDebtors,
  ].map((val) => Number(val) || 0);

  return (
    <View>
      <SafeAreaView className="h-full">
        <CloseButton className="ml-4"></CloseButton>
        <ScrollView>
          <View className={cn(CONTAINER, "flex flex-col gap-4 mt-4")}>
            <View className="flex flex-col gap-4">
              <DashboardCardOnly
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                categories={categories}
                direction="col"
              />
              <DashboardCardRing
                widthAndHeight={widthAndHeight2}
                series={series2}
                sliceColor={sliceColor2}
                categories={categories2}
                direction="col"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default index;
