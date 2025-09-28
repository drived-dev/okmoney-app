import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  VirtualizedList,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { Historylist } from "~/components/history/history-list";
import moment from "moment";
import { getPaymentHistory } from "~/api/payment/get-history-all";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory, PaymentType } from "~/types/payment-history";
import WorkFromHome from "~/assets/images/work-from-home.jsx";
interface HistoryPageProps {
  name?: string;
  nickname?: string;
  data: PaymentHistory[];
}
const groupDataByDate = (data: PaymentHistory[]) => {
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");
  const thisYear = moment().year();

  return data
    .sort(
      (a, b) => moment(b.updatedAt).valueOf() - moment(a.updatedAt).valueOf()
    ) // Sort newest first
    .reduce((groups, item) => {
      const itemDate = moment(item.updatedAt);
      const itemDay = itemDate.startOf("day");

      let label: string;

      if (itemDay.isSame(today, "day")) {
        label = "วันนี้";
      } else if (itemDay.isSame(yesterday, "day")) {
        label = "เมื่อวาน";
      } else if (itemDate.year() === thisYear) {
        // For dates in current year, show just day and month
        label = itemDate.format("D MMM");
      } else {
        // For dates in previous years, include year
        label = itemDate.format("D MMM YY");
      }

      if (!groups[label]) {
        groups[label] = [];
      }
      groups[label].push(item);
      return groups;
    }, {} as { [key: string]: PaymentHistory[] });
};

const HistoryPage: React.FC<HistoryPageProps> = ({ name, nickname, data }) => {
  const [refreshing, setRefreshing] = useState(false);
  const groupedData = groupDataByDate(data);
  console.log("groupdata", groupedData);
  console.log("data", data);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "mt-4")}>
        <View className="flex flex-col gap-1 ">
          <Text className={cn(TITLE, "")}>ประวัติการชำระ</Text>
          {nickname?.length && nickname?.length > 2 && (
            <View className="flex flex-row items-center space-x-2 gap-2">
              <Text className={cn(TITLE, "")}>ของ</Text>
              <View className="border border-gray-300 rounded-2xl px-2 flex-row items-end gap-1 -translate-y-2">
                <Text className={cn(TITLE, "font-bold pt-4")}>{nickname}</Text>
                <Text className={cn(PARAGRAPH, "-translate-y-1")}>{name}</Text>
              </View>
            </View>
          )}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {Object.keys(groupedData).length === 0 ? (
            <View className="py-40 items-center justify-center">
              <View>
                <WorkFromHome width={300} height={300} />
              </View>
              <Text className={cn(PARAGRAPH, "text-gray-500 ")}>
                ยังไม่มีประวัติการชำระ
              </Text>
            </View>
          ) : (
            Object.keys(groupedData).map((dateLabel) => (
              <View key={dateLabel}>
                <Text className={cn(PARAGRAPH, "")}>{dateLabel}</Text>
                <View className={cn("h-[1px] bg-gray-300 my-2")} />

                {groupedData[dateLabel].map((item, index) => (
                  <Historylist
                    key={index}
                    url={item.imageUrl}
                    nickname={item.debtorNickname}
                    name={`${item.debtorFirstName || ""} ${
                      item.debtorLastName || ""
                    }`}
                    variant={item.paymentType}
                    slip={item.imageUrl}
                    value={item.amount}
                  />
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HistoryPage;
