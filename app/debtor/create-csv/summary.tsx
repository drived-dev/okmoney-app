import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BUTTON, LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";
import { CONTAINER } from "~/constants/Styles";
import { Loan } from "~/types/Loan";
import { Edit } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import CreatedLoanWrapper from "./(components)/created-loan-wrapper";

const createdLoans: Loan[] = [
  {
    id: "01",
    nickname: "บิบิ",
    name: "ธน สมพง",
    status: "รอชำระ",
    outstanding: 0,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    totalLoanTerm: 12,
  },
  {
    id: "02",
    nickname: "แบงค์",
    name: "ธนาการ",
    status: "ใกล้กำหนด",
    outstanding: 100,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    totalLoanTerm: 12,
  },
  {
    id: "03",
    nickname: "บิน",
    name: "ธุดง",
    status: "ครบชำระ",
    outstanding: 200,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    totalLoanTerm: 12,
  },
  {
    id: "04",
    nickname: "โบ๊ท",
    name: "ทองสิระ",
    status: "ค้างชำระ",
    outstanding: 300,
    total: 500,
    dueDate: "30/5",
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    totalLoanTerm: 12,
  },
];

const Summary = () => {
  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex flex-col gap-5 h-full")}>
        <View className="flex flex-col gap-1 ">
          <Text className={cn(TITLE)}>สร้างลูกหนี้่จำนวนมาก</Text>
          <Text className={cn(PARAGRAPH)}>สร้างลูกหนี้หลายคนพร้อมกัน</Text>
        </View>
        <View className="flex flex-col gap-2">
          <CreatedLoanWrapper
            className="flex-auto"
            title="เพิ่มลูกหนี้สำเร็จ"
            loanCount={createdLoans.length}
            loans={createdLoans}
          />
          <CreatedLoanWrapper
            className="flex-auto"
            title="เกิดข้อผิดพลาด"
            loanCount={createdLoans.length}
            loans={createdLoans}
          />
        </View>
        <View className="flex-row gap-1 mt-auto">
          <Button className="flex-1" variant="outline">
            <Text className={cn(BUTTON.black)}>อัปโหลดใหม่</Text>
          </Button>
          <Button className="flex-1">
            <Text className={cn(BUTTON.white)}>บันทึก</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Summary;
