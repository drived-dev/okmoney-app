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
  const today = moment();
  const yesterday = moment().subtract(1, "days");

  const groupedData = data.reduce((groups, item) => {
    const itemDate = moment(item.updatedAt);
    let label = itemDate.format("DD MMM YY");

    if (itemDate.isSame(today, "day")) {
      label = "วันนี้";
    } else if (itemDate.isSame(yesterday, "day")) {
      label = "เมื่อวาน";
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(item);

    return groups;
  }, {} as { [key: string]: PaymentHistory[] });

  Object.keys(groupedData).forEach((key) => {
    groupedData[key] = groupedData[key].sort((a, b) =>
      moment(a.updatedAt, "HH:mm").diff(moment(b.updatedAt, "HH:mm"))
    );
  });

  return groupedData;
};

const HistoryPage: React.FC<HistoryPageProps> = ({ name, nickname, data }) => {
  const [refreshing, setRefreshing] = useState(false);
  const groupedData = groupDataByDate(data);

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
              <View className="border border-gray-300 rounded-2xl px-2 pt-1 flex-row items-center gap-1">
                <Text className={cn(TITLE, "font-bold")}>
                  {nickname}
                  <Text className={cn(PARAGRAPH)}>{name}</Text>
                </Text>
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
