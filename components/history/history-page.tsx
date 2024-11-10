import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  VirtualizedList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { Historylist } from "~/components/history/history-list";
import moment from "moment";
import { getPaymentHistory } from "~/api/payment/get-history-all";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory, PaymentType } from "~/types/payment-history";

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
  const groupedData = groupDataByDate(data);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className={cn(CONTAINER, "mt-4")}>
          <View className="flex flex-col gap-1">
            <Text className={cn(TITLE, "")}>ประวัติการชำระ</Text>
            <View className="flex flex-row items-center space-x-2 gap-2">
              <Text className={cn(TITLE, "")}>ของ</Text>
              <View className="border border-gray-300 rounded-2xl px-2 pt-1 flex-row items-center gap-1">
                <Text className={cn(TITLE, "font-bold")}>{nickname} </Text>
                {name?.length && name?.length > 2 && (
                  <Text className={cn(PARAGRAPH)}>{name}</Text>
                )}
              </View>
            </View>
          </View>

          {Object.keys(groupedData).map((dateLabel) => (
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
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryPage;
