import React, { useCallback, useRef } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import OnlineOnly from "~/components/online-only";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import DashboardCard from "~/components/dashboard/piechart";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";
import BarPairWithLine from "~/components/dashboard/barplot";
import { useQuery } from "@tanstack/react-query";
import { getDashboardAll } from "~/api/dashboard/get-dashboard-all";
import { getDashboardYear } from "~/api/dashboard/get-dashboard-year";
import { getDashboardMonth } from "~/api/dashboard/get-dashboard-month";
import useUserStore from "~/store/use-user-store";
import { formatMoney } from "~/lib/parse-money";

const App: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const user = useUserStore();
  const [value, setValue] = React.useState<string>("years");

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleToggleChange = (newValue: string) => {
    if (newValue && newValue !== value) {
      setValue(newValue);
    }
  };

  const { data: dashboard = {} } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardAll,
    retry: false,
    refetchInterval: 1000000,
  });

  const series = [
    dashboard.totalLoan ?? 0,
    dashboard.totalEarned ?? 0,
    dashboard.accuredIncome ?? 0,
    dashboard.profit ?? 0,
  ];

  const { data: dashboardLastYear = {} } = useQuery({
    queryKey: ["dashboardLastYear"],
    queryFn: getDashboardYear,
    retry: false,
    refetchInterval: 1000000,
  });

  const totalLoanLastYear = dashboardLastYear.data?.[1]?.principal ?? 0;
  const { data: dashboardLastMonth = {} } = useQuery({
    queryKey: ["dashboardLastMonth"],
    queryFn: getDashboardMonth,
    retry: false,
    refetchInterval: 1000000,
  });

  const seriesYear = [
    dashboardLastYear.data?.[9]?.earned ?? 0,
    dashboardLastYear.data?.[8]?.principal ?? 0,
    dashboardLastYear.data?.[7]?.earned ?? 0,
    dashboardLastYear.data?.[6]?.principal ?? 0,
    dashboardLastYear.data?.[5]?.earned ?? 0,
    dashboardLastYear.data?.[4]?.principal ?? 0,
    dashboardLastYear.data?.[3]?.earned ?? 0,
    dashboardLastYear.data?.[2]?.principal ?? 0,
    dashboardLastYear.data?.[1]?.earned ?? 0,
    dashboardLastYear.data?.[0]?.principal ?? 0,
  ];
  const year = Date.parse(dashboardLastYear.data?.[0]?.time) ?? Date.now();

  const seriesMonth = [
    dashboardLastMonth.data?.[7]?.earned ?? 0,
    dashboardLastMonth.data?.[6]?.principal ?? 0,
    dashboardLastMonth.data?.[5]?.earned ?? 0,
    dashboardLastMonth.data?.[4]?.principal ?? 0,
    dashboardLastMonth.data?.[3]?.earned ?? 0,
    dashboardLastMonth.data?.[2]?.principal ?? 0,
    dashboardLastMonth.data?.[1]?.earned ?? 0,
    dashboardLastMonth.data?.[0]?.principal ?? 0,
  ];
  const month = Date.parse(dashboardLastYear.data?.[0]?.time) ?? Date.now();

  return (
    <View>
      <SafeAreaView className="h-full">
        <ScrollView
          stickyHeaderIndices={[0]}
          className={cn(CONTAINER, "flex flex-col gap-4 mt-4")}
        >
          <View>
            <Text className={cn(TITLE, "bg-background py-4")}>แดชบอร์ด</Text>
          </View>
          <View className="flex flex-col gap-2">
            <View>
              <Image
                source={require("assets/images/promo.png")}
                className="w-full object-cover rounded-2xl"
              />
            </View>
            <DashboardCard
              userName={user.storeName}
              totalMoney={formatMoney(dashboard.totalLoan) ?? 0}
              changeAmount={formatMoney(
                dashboard.totalLoan - totalLoanLastYear
              )}
              changePercentage={
                totalLoanLastYear === 0
                  ? "-"
                  : (dashboard.totalLoan / totalLoanLastYear) * 100
              }
              isPositive={true}
              widthAndHeight={100}
              series={series}
              sliceColor={["#fbd203", "#ffb300", "#ff9100", "#ff6c00"]}
              categories={[
                "ยอดปล่อยทั้งหมด",
                "ยอดที่ชำระ",
                "ยอดที่ต้องเก็บ",
                "ดอกเบี้ยที่ได้รับ",
              ]}
              direction="row"
            />
            <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
              <View className="justify-between flex flex-row">
                <ToggleGroup
                  value={value}
                  onValueChange={handleToggleChange}
                  type="single"
                >
                  <ToggleGroupItem value="years" aria-label="Toggle years">
                    <Text className={cn(PARAGRAPH, "")}>รายปี</Text>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="months" aria-label="Toggle months">
                    <Text className={cn(PARAGRAPH, "")}>รายเดือน</Text>
                  </ToggleGroupItem>
                </ToggleGroup>
                <Text></Text>
              </View>
              <BarPairWithLine
                toggleValue={value}
                seriesYear={seriesYear}
                seriesMonth={seriesMonth}
                year={year}
                month={month}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OnlineOnly(App);
