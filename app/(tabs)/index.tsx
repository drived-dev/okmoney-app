import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import {
  PARAGRAPH,
  TITLE,
  BUTTON,
  PARAGRAPH_BOLD,
  LABEL,
} from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { LoanCard } from "~/components/main/loan-card";
import { Loan } from "~/types/Loan";
import { Searchbar } from "~/components/main/search_bar";
import { Icon } from "~/components/icon";
import { AvatarText } from "~/components/avatar-text";
import { IconButton } from "~/components/icon-button";
import { Plus } from "lucide-react-native";
const Index = () => {
  const loandata = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 7,
  };

  const demodata: Loan[] = [
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
    },
  ];

  return (
    <View className="">
      <LinearGradient
        colors={["#F3D791", "#DF9C59", "#FD954B"]}
        start={{ x: 1, y: -0.4 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradientBackground}
      />

      <SafeAreaView>
        <View className={cn(CONTAINER, "justify-between flex flex-row")}>
          <AvatarText url={loandata.profileImage} title="test">
            <Text className={cn(PARAGRAPH, "text-primary")}>
              {loandata.nickname}
            </Text>
          </AvatarText>
          <View className="flex flex-row gap-2">
            {/* Conditionally render the premium button based on loandata.status */}
            {loandata.status !== 0 && (
              <>
                <IconButton
                  textColor="#E59551"
                  icon={<Plus />}
                  variant="secondary"
                />
              </>
            )}
            <IconButton
              className="bg-white"
              textColor="#E59551"
              icon={<Plus />}
              text="เพิ่มลูกหนี้"
            />
          </View>
        </View>

        <View
          className={cn(
            CONTAINER,
            "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-2"
          )}
        >
          <View className="flex flex-col gap-5">
            <View>
              <ThemeToggle />
            </View>
            <View>
              <Searchbar></Searchbar>
            </View>
          </View>
          <View className="flex flex-col">
            {/* alert */}
            <View className="bg-[#A35D2B]/10 justify-between flex flex-row rounded-2xl py-3  items-center px-5">
              <Text className={cn(PARAGRAPH_BOLD, "")}>
                ลูกหนี้เต็มสำหรับแพ็คเกจคุณ
              </Text>
              <Button className="rounded-full">
                <Text className={cn(LABEL, "items-center")}>ดูแพ็คเกจ</Text>
              </Button>
            </View>
            <FlatList
              data={demodata}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <LoanCard loan={item} />}
              className="mt-4"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 200,
  },
});
