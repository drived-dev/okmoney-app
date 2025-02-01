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

const widthAndHeight = 200;
const series0_1 = [1];
const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
const categories = [
  "ยอดปล่อยทั้งหมด",
  "ยอดที่ชำระ",
  "ยอดที่ต้องเก็บ",
  "ดอกเบี้ยที่ได้รับ",
];

const widthAndHeight2 = 200;

const series0_2 = [1];
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
  // Add default values of 0 and ensure numbers
  const series = [
    Number(dashboard.totalLoan) || 0,
    Number(dashboard.accuredIncome) || 0,
    Number(dashboard.totalEarned) || 0,
    Number(dashboard.profit) || 0,
  ];

  const { data: dashboardDebtors = [] } = useQuery({
    queryKey: ["dashboardDebtors"],
    queryFn: () => getDashboardDebtors(),
  });
  // Add default values of 0 and ensure numbers
  const series2 = [
    Number(dashboardDebtors.totalDebtors) || 0,
    Number(dashboardDebtors.currentDebtors) || 0,
    Number(dashboardDebtors.clearedDebtors) || 0,
  ];

  // Add check for zero sum
  const hasData = series.reduce((a, b) => a + b, 0) > 0;
  const hasDebtorsData = series2.reduce((a, b) => a + b, 0) > 0;

  function handleBack() {
    router.back();
  }

  const renderDashboardCard = () => (
    <DashboardCardOnly
      widthAndHeight={widthAndHeight}
      series={hasData ? series : series0_1}
      sliceColor={hasData ? sliceColor : ["#E5E7EB"]}
      categories={categories}
      direction="col"
    />
  );

  const renderDebtorsCard = () => (
    <DashboardCardRing
      widthAndHeight={widthAndHeight2}
      series={hasDebtorsData ? series2 : series0_2}
      sliceColor={hasDebtorsData ? sliceColor2 : ["#E5E7EB"]}
      categories={categories2}
      direction="col"
    />
  );

  return (
    <View>
      <SafeAreaView className="h-full">
        <CloseButton className="ml-4" />
        <ScrollView>
          <View className={cn(CONTAINER, "flex flex-col gap-4 mt-4")}>
            <View className="flex flex-col gap-4">
              {renderDashboardCard()}
              {renderDebtorsCard()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default index;
