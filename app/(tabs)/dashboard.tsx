import React, { useCallback, useRef } from "react";
import { View, SafeAreaView, ScrollView, Image } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import OnlineOnly from "~/components/online-only";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import DashboardCard from "~/components/dashboard/piechart";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import BarPairChart from "~/components/dashboard/pairplot";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import { Bold } from "lucide-react-native";
import { Italic } from "lucide-react-native";
import { Underline } from "lucide-react-native";

const App: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [value, setValue] = React.useState<string[]>([]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const widthAndHeight = 100;
  const series = [10, 20, 30, 40];
  const sliceColor = ["#fbd203", "#ffb300", "#ff9100", "#ff6c00"];
  const categories = [
    "ยอดปล่อยทั้งหมด",
    "ยอดที่ชำระ",
    "ยอดที่ต้องเก็บ",
    "ดอกเบี้ยที่ได้รับ",
  ];

  const userName = "ธาม";
  const totalMoney = "820,300.23";
  const changeAmount = 123231;
  const changePercentage = 14.53;
  const isPositive = changeAmount >= 0;

  const chartData = [
    { year: "2024", values: [212.3e9, 112.3e9] },
    { year: "2025", values: [220.3e9, 120.3e9] },
    { year: "2026", values: [230.3e9, 130.3e9] },
    { year: "2027", values: [240.3e9, 140.3e9] },
  ];

  const colors = ["#fbd203", "#ff9100"];
  const labels = ["ยอดปล่อยทั้งหมด", "ยอดที่ได้รับ"];

  return (
    <View>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className={cn(CONTAINER, "flex flex-col gap-4 mt-4")}>
            <View>
              <Text className={cn(TITLE, "")}>Dashboard</Text>
            </View>
            <View>
              <Image
                source={require("assets/images/promo.png")}
                className="w-full object-cover rounded-2xl"
              />
            </View>

            <DashboardCard
              userName={userName}
              totalMoney={totalMoney}
              changeAmount={changeAmount}
              changePercentage={changePercentage}
              isPositive={isPositive}
              widthAndHeight={widthAndHeight}
              series={series}
              sliceColor={sliceColor}
              categories={categories}
              direction="row"
            />
            <View className="border border-gray-300 rounded-lg p-4 flex flex-col gap-2">
              <View className="justify-between flex flex-row">
                <ToggleGroup
                  value={value}
                  onValueChange={setValue}
                  type="single"
                >
                  <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Text className={cn(PARAGRAPH, "")}>รายปี</Text>
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Toggle italic">
                    <Text className={cn(PARAGRAPH, "")}>รายเดือน</Text>
                  </ToggleGroupItem>
                </ToggleGroup>
                <Text></Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OnlineOnly(App);
