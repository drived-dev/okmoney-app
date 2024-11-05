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

const App: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [value, setValue] = React.useState<string>("years"); // Set default value to "years"

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleToggleChange = (newValue: string) => {
    if (newValue && newValue !== value) {
      setValue(newValue);
    }
  };

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
              userName="ธาม"
              totalMoney="820,300.23"
              changeAmount={123231}
              changePercentage={14.53}
              isPositive={true}
              widthAndHeight={100}
              series={[10, 20, 30, 40]}
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
              {/* Pass the toggle value as a prop */}
              <BarPairWithLine toggleValue={value} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default OnlineOnly(App);
