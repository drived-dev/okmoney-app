import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, BUTTON, LABEL, TITLE } from "~/constants/Typography";
import { Icon } from "../ui/icon";
import { Button } from "../ui/button";
import { Loan } from "~/types/Loan";
import ProgressText from "../progress-text";

const statusColorsbg: Record<string, string> = {
  ค้างชำระ: "bg-red-500", // Overdue
  ครบชำระ: "bg-gray-200", // Paid
  รอชำระ: "bg-blue-500", // Pending
  ใกล้กำหนด: "bg-yellow-500", // Canceled
};

const statusColorstxt: Record<string, string> = {
  ค้างชำระ: "text-destructive-foreground", // Overdue
  ครบชำระ: "text-gray-600", // Paid
  รอชำระ: "text-destructive-foreground", // Pending
  ใกล้กำหนด: "text-destructive-foreground", // Canceled
};

export const LoanItem = ({ loan }: { loan: Loan }) => {
  // Calculate the progress based on outstanding vs total
  const progress = loan.outstanding / loan.total;
  const statusColorbg = statusColorsbg[loan.status] || "bg-blue-500";
  const statusColortxt = statusColorstxt[loan.status] || "text-textb";

  return (
    // background deptor
    //TODO: status 1 must be show
    <View className="bg-card p-3 my-1 rounded-3xl border border-border space-y-3 ">
      {/* Profile Image and Loan Info */}
      <View className="flex flex-col gap-2">
        <View className="justify-between flex flex-row">
          <View className="flex-row items-center space-x-4">
            {/* Profile Image */}
            <Image
              source={{ uri: loan.profileImage }}
              className="w-12 h-12 rounded-full"
            />

            {/* Loan Info */}
            <View>
              <Text className={cn(LABEL, "text-muted-foreground pl-2")}>
                เลขสัญญา {loan.id}
              </Text>
              {/* Name: Bold nickname, gray full name */}
              <Text className={cn(PARAGRAPH, "pl-2 ")}>
                {loan.nickname + "  "}
                <Text className="text-muted-foreground font-ibm text-sm">
                  {loan.name}
                </Text>
              </Text>
            </View>
          </View>

          {/* Loan Status */}
          <View className="flex-row flex gap-2">
            <View
              className={`px-3 py-2 rounded-2xl self-start ${statusColorbg}`}
            >
              <Text
                className={cn(
                  LABEL,
                  `font-ibm-semibold text-destructive-foreground ${statusColortxt}`
                )}
              >
                {loan.status}
              </Text>
            </View>

            <Button variant="ghost" size={"icon"}>
              <Icon name="Ellipsis" size={24} color="#71717a" />
            </Button>
          </View>
        </View>

        {/* Outstanding Amount and Progress Bar with Total Amount on the Right */}
        <View className="flex-row gap-2 content-center">
          {/* Progress Bar */}
          <ProgressText
            textStart="0 บาท"
            textEnd="200 บาท"
            percentage={60}
            className="flex-1"
          />
          {/* Due Date */}
          <Text className={cn(TITLE, "text-muted-foreground text-sm mt-1")}>
            ชำระทุก {loan.dueDate}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center mt-3 space-x-2 mb- gap-1">
        {/* Conditionally render buttons based on loan status */}
        {loan.status !== "ครบชำระ" ? (
          <>
            {/* Remind Button with Icon */}
            <Button className="bg-destructive-foreground flex-1 flex-row justify-center items-center border border-muted-foreground rounded-2xl py-2">
              <Icon name="Send" color="#71717a" size={22} />
              <Text className={cn(BUTTON, "text-textb ml-2 font-ibm-semibold")}>
                ทวงหนี้
              </Text>
            </Button>

            {/* Save Button */}
            <Button className="flex-1 bg-destructive py-2 flex-row justify-center items-center rounded-2xl">
              <Icon name="NotebookPen" color="white" size={22} />
              <Text
                className={cn(
                  BUTTON,
                  "text-destructive-foreground font-ibm-semibold ml-2"
                )}
              >
                บันทึกรายการ
              </Text>
            </Button>
          </>
        ) : (
          <Button className="bg-destructive-foreground flex-1 flex-row justify-center items-center border border-muted-foreground rounded-2xl py-2">
            <Icon name="Send" color="gray" size={22} />
            <Text className={cn(BUTTON, "text-gray500 ml-2 font-ibm-semibold")}>
              เปิดรายการใหม่
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};
