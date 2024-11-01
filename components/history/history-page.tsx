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

interface HistoryItem {
  url: string;
  nickname?: string;
  name: string;
  variant: "cash" | "create" | "payment";
  slip?: string;
  value: string | number;
  date: string;
  time: string;
}

interface HistorylistProps {
  url: string;
  nickname?: string;
  name: string;
  variant: "cash" | "create" | "payment";
  slip?: string;
  value: string | number;
}

interface HistoryPageProps {
  name?: string;
  nickname?: string;
  data: HistoryItem[];
}

const groupDataByDate = (data: HistoryItem[]) => {
  const today = moment();
  const yesterday = moment().subtract(1, "days");

  const groupedData = data.reduce((groups, item) => {
    const itemDate = moment(item.date);
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
  }, {} as { [key: string]: HistoryItem[] });

  Object.keys(groupedData).forEach((key) => {
    groupedData[key] = groupedData[key].sort((a, b) =>
      moment(a.time, "HH:mm").diff(moment(b.time, "HH:mm"))
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
            {name && (
              <View className="flex flex-row items-center space-x-2 gap-2">
                <Text className={cn(TITLE, "")}>ของ</Text>
                <View className="border border-gray-300 rounded-2xl px-2 pt-1">
                  {nickname ? (
                    <Text>
                      <Text className={cn(TITLE, "font-bold")}>
                        {nickname}{" "}
                      </Text>
                      <Text className={cn(PARAGRAPH, "")}>{name}</Text>
                    </Text>
                  ) : (
                    <Text className={cn(TITLE, "font-bold")}>{name}</Text>
                  )}
                </View>
              </View>
            )}
          </View>

          {Object.keys(groupedData).map((dateLabel) => (
            <View key={dateLabel}>
              <Text className={cn(PARAGRAPH, "")}>{dateLabel}</Text>
              <View className={cn("h-[1px] bg-gray-300 my-2")} />

              {groupedData[dateLabel].map((item, index) => (
                <Historylist
                  key={index}
                  url={item.url}
                  nickname={item.nickname}
                  name={item.name}
                  variant={item.variant}
                  slip={item.slip}
                  value={item.value}
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
