import * as React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/text";
import { Icon } from "../icon";
import colors from "tailwindcss/colors";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Trash } from "lucide-react-native";
import { router } from "expo-router";
import useLoanStore from "~/store/use-loan-store";
import { deleteLoan } from "~/api/loans/delete-loan";
import { Alert } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";

export const LoanCardMenu = ({
  openGuarantorSheet,
  openInfoSheet,
  debtorId,
  loanId,
}: {
  openGuarantorSheet: () => void;
  openInfoSheet: () => void;
  debtorId: string;
  loanId: string;
}) => {
  const removeLoan = useLoanStore((state) => state.removeLoan);

  async function deleteLoanAlert() {
    Alert.alert("ลบลูกหนี้", "การลบลูกหนี้ไม่สามารถย้อนกลับได้", [
      { text: "ยกเลิก", style: "cancel" },
      {
        text: "ยืนยัน",
        style: "destructive",
        onPress: handleDeleteLoan,
      },
    ]);
  }

  async function handleDeleteLoan() {
    const response = await deleteLoan(debtorId);
    if (response.status === 200) {
      removeLoan(loanId);

      Toast.show({
        text1: "ลบลูกหนี้สำเร็จ",
        type: "success",
      });
    } else {
      Toast.show({
        text1: "ลบลูกหนี้ไม่สำเร็จ",
        type: "error",
      });
    }
  }

  const menuLinks = [
    {
      name: `ดูประวัติ`,
      onPress: () => router.push(`/debtor/history/${debtorId}`),
    },
    {
      name: "แก้ไขข้อมูล",
      onPress: () => router.push(`/debtor/edit/${debtorId}`),
    },
    {
      name: "ข้อมูลผู้ค้ำประกัน",
      onPress: () => openGuarantorSheet(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Icon name="Ellipsis" size={24} color={colors.gray[500]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel className="text-gray-500">
          จัดการลูกหนี้
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuLinks.map((item, index) => (
          // TODO: map with link
          <DropdownMenuItem key={index} onPress={item.onPress}>
            <Text className={cn(PARAGRAPH)}>{item.name}</Text>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row justify-between items-center"
          onPress={deleteLoanAlert}
        >
          <Text className={cn(PARAGRAPH, "text-destructive")}>ลบลูกหนี้</Text>
          <Trash size={20} color={colors.red[400]}></Trash>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
