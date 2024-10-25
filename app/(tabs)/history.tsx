import { StatusBar, StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { Historylist } from "~/components/history/history-list";
import moment from "moment";

// Define TypeScript interface for the data and props
interface HistoryItem {
  url: string;
  nickname?: string;
  name: string;
  variant: "cash" | "create" | "payment";
  slip?: string;
  value: string | number;
  date: string; // in YYYY-MM-DD format
  time: string; // in HH:mm format
}

// Interface for the Historylist props
interface HistorylistProps {
  url: string;
  nickname?: string;
  name: string;
  variant: "cash" | "create" | "payment";
  slip?: string;
  value: string | number;
}

// Generate demo data with date and time
const demoData: HistoryItem[] = [
  {
    url: "https://img.freepik.com/free-photo/portrait-smiling-young-man_23-2148214699.jpg",
    nickname: "อาร์ม",
    name: "วุฒิชัย บัวทอง",
    variant: "cash",
    slip: undefined,
    value: "2,000",
    date: "2024-10-13", // Today
    time: "09:30",
  },
  {
    url: "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    nickname: "แจ็ค",
    name: "สมพงค์ มนตรี",
    variant: "payment",
    slip: "https://www.kasikornbank.com/SiteCollectionDocuments/personal/digital-banking/kplus/v2/img/instruction/slip-history-05.jpg?v1",
    value: "1,500",
    date: "2024-10-13", // Today
    time: "14:30",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-happy-young-woman_23-2148214699.jpg",
    nickname: "แพร",
    name: "ณิชาภัทร วงศ์กมล",
    variant: "create",
    slip: undefined,
    value: "3,000",
    date: "2024-10-12", // Yesterday
    time: "12:15",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-smiling-man-glasses_23-2148214699.jpg",
    nickname: "ต้น",
    name: "วีระพล กิจเจริญ",
    variant: "cash",
    slip: undefined,
    value: "5,000",
    date: "2024-10-11", // 2 Days Ago
    time: "10:45",
  },
  {
    url: "https://img.freepik.com/free-photo/happy-man-smiling_23-2148214699.jpg",
    nickname: "ภูมิ",
    name: "ภูมิ พิพัฒน์",
    variant: "payment",
    slip: "https://example.com/slip2.png",
    value: "800",
    date: "2024-10-10", // 3 Days Ago
    time: "16:50",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-young-man-glasses_23-2148214699.jpg",
    nickname: "เนม",
    name: "ชยุต เกรียงไกร",
    variant: "payment",
    slip: undefined,
    value: "10,000",
    date: "2024-09-30", // Random Date
    time: "11:20",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-happy-young-man_23-2148214699.jpg",
    nickname: "บอส",
    name: "ภาคิน คำแหง",
    variant: "cash",
    slip: undefined,
    value: "7,000",
    date: "2024-09-28", // Random Date
    time: "13:15",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-happy-young-woman_23-2148214699.jpg",
    nickname: "มุก",
    name: "มุกดา มานพ",
    variant: "create",
    slip: undefined,
    value: "12,000",
    date: "2024-09-27", // Random Date
    time: "17:45",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-young-woman-smiling_23-2148214699.jpg",
    nickname: "นิด",
    name: "นภา เทพนิมิต",
    variant: "payment",
    slip: "https://example.com/slip3.png",
    value: "3,500",
    date: "2024-09-26", // Random Date
    time: "19:30",
  },
  {
    url: "https://img.freepik.com/free-photo/portrait-young-woman-happy_23-2148214699.jpg",
    nickname: "ใบเฟิร์น",
    name: "เฟิร์น ศรีสุข",
    variant: "cash",
    slip: undefined,
    value: "1,200",
    date: "2024-09-20", // Random Date
    time: "08:10",
  },
];

// Helper function to group and sort data by date and time
const groupDataByDate = (data: HistoryItem[]) => {
  const today = moment();
  const yesterday = moment().subtract(1, "days");

  const groupedData = data.reduce((groups, item) => {
    const itemDate = moment(item.date);
    let label = itemDate.format("DD MMM YY"); // Default to formatted date

    if (itemDate.isSame(today, "day")) {
      label = "วันนี้"; // Today
    } else if (itemDate.isSame(yesterday, "day")) {
      label = "เมื่อวาน"; // Yesterday
    }

    // If group exists, push to it, otherwise create a new group
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(item);

    return groups;
  }, {} as { [key: string]: HistoryItem[] });

  // Sort the groups by time (00:00 at the top and 23:59 at the bottom)
  Object.keys(groupedData).forEach((key) => {
    groupedData[key] = groupedData[key].sort((a, b) =>
      moment(a.time, "HH:mm").diff(moment(b.time, "HH:mm"))
    );
  });

  return groupedData;
};

const HistoryPage = () => {
  // Group data by date and sort by time
  const groupedData = groupDataByDate(demoData);

  return (
    <SafeAreaView>
      {/* ScrollView to allow scrolling */}
      <ScrollView>
        <View className={cn(CONTAINER, "mt-4")}>
          <Text className={cn(TITLE, "")}>ประวัติการชำระ</Text>

          {/* Render each date group */}
          {Object.keys(groupedData).map((dateLabel) => (
            <View key={dateLabel}>
              {/* Date Group Header */}
              <Text className={cn(PARAGRAPH, "")}>{dateLabel}</Text>

              {/* Line Separator Under Date */}
              <View className={cn("h-[1px] bg-gray-300 my-2")} />

              {/* Render each Historylist entry for this date group */}
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
