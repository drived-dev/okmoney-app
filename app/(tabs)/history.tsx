import React from "react";
import { View } from "react-native";
import HistoryPage from "~/components/history/history-page";
import { SafeAreaView } from "react-native";
import OnlineOnly from "~/components/online-only";

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

const History = () => {
  return <HistoryPage name="สมชาย" nickname="ธาม" data={demoData} />;
};

export default OnlineOnly(History);
