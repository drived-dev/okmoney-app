import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { cn } from "~/lib/utils";
import { PARAGRAPH, BUTTON, LABEL, TITLE } from "~/constants/Typography";
import { Icon } from "~/components/icon";
import { Button } from "~/components/ui/button";
import { Loan } from "~/types/Loan";
import ProgressText from "~/components/progress-text";
import { IconButton } from "~/components/icon-button";
import colors from "tailwindcss/colors";
import { LoanCardMenu } from "./loan-card-menu";
import useEditingLoanStore from "~/store/use-editing-loan-store";
import { timestampToDate } from "~/lib/timestamp-to-date";
import { formatMoney } from "~/lib/parse-money";
import Status from "../status";
import { AvatarText } from "../avatar-text";
import Toast from "react-native-toast-message";
import api from "~/lib/axios";
import useUserStore from "~/store/use-user-store";

export const LoanCard = ({
  loan,
  onMemo,
  onGuarantor,
  onInfo,
}: {
  loan: Loan;
  onMemo: () => void;
  onGuarantor: () => void;
  onInfo: () => void;
}) => {
  const { setId } = useEditingLoanStore();
  const [sending, setSending] = useState(false);
  const user = useUserStore();
  // Calculate the progress based on outstanding vs total
  const progress = loan.remainingBalance / loan.total;

  function openMemoSheet() {
    setId(loan.id);
    onMemo();
  }

  function openGuarantorSheet() {
    setId(loan.id);
    onGuarantor();
  }

  function openDebtorModal() {
    setId(loan.id);
    onInfo();
  }

  const creditLeft = (user.smsCredit ?? 0) - (user.smsUsed ?? 0);

  function normalizeThaiPhone(input?: string) {
    if (!input) return undefined;
    const digits = input.replace(/[^\d+]/g, "");
    if (digits.startsWith("+")) return digits;
    if (digits.startsWith("0")) return "+66" + digits.slice(1);
    if (digits.startsWith("66")) return "+" + digits;
    return digits;
  }

  async function sendReminder() {
    if (sending) return;

    const to = normalizeThaiPhone(loan.phoneNumber);
    if (!to) {
      Toast.show({
        text1: "ไม่พบเบอร์ผู้กู้",
        text2: "กรุณาเพิ่มเบอร์โทรในสัญญาก่อนส่งแจ้งเตือน",
        type: "error",
        position: "bottom",
      });
      return;
    }

    const msg = `แจ้งเตือนชำระหนี้ เลขสัญญา ${
      loan.loanNumber
    } ยอดคงค้าง ${formatMoney(
      loan.remainingBalance
    )} โปรดชำระตามกำหนด ขอบคุณครับ`;

    try {
      setSending(true);

      // ช่วย debug baseURL (ดูใน Metro/Console)
      // @ts-ignore
      console.log(
        "POST",
        (api.defaults?.baseURL || "") + "/notification/send",
        { to, msg }
      );

      const res = await api.post(
        "/notification/send",
        { to, msg },
        { timeout: 15000 }
      );

      // ✅ สำเร็จสำหรับ 2xx ทั้งหมด
      if (res.status >= 200 && res.status < 300) {
        const nextUsed = (user.smsUsed ?? 0) + 1;
        user.setUser({ smsUsed: nextUsed });

        Toast.show({
          text1: "ส่ง SMS สำเร็จ!",
          type: "success",
          position: "bottom",
        });
        return;
      }

      // ไม่ใช่ 2xx
      Toast.show({
        text1: "ส่งไม่สำเร็จ",
        text2: `สถานะ: ${res.status} ${res.statusText ?? ""}`.trim(),
        type: "error",
        position: "bottom",
      });
    } catch (e: any) {
      // log เพิ่มให้เห็นชัด
      console.log("sendReminder error:", {
        message: e?.message,
        status: e?.response?.status,
        data: e?.response?.data,
        url: e?.config?.url,
        baseURL: api.defaults?.baseURL,
      });

      // แยกข้อความสำหรับ network/timeout กับ 401
      const status = e?.response?.status;
      const isNetwork =
        e?.message?.includes("Network") || e?.message?.includes("timeout");
      const detail =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        (isNetwork ? "เครือข่ายขัดข้อง หรือปลายทางไม่ตอบสนอง" : e?.message) ||
        "เกิดข้อผิดพลาด";

      Toast.show({
        text1: status === 401 ? "หมดสิทธิ์ใช้งาน" : "ส่งไม่สำเร็จ",
        text2: status ? `สถานะ: ${status} | ${detail}` : detail,
        type: "error",
        position: "bottom",
      });
    } finally {
      setSending(false);
    }
  }

  const paidAmount = loan.total - loan.remainingBalance;
  return (
    // background deptor
    <TouchableOpacity onPress={openDebtorModal}>
      <View
        className={cn(
          "bg-card p-3 my-1 rounded-3xl border border-border space-y-3",
          loan.status == "ครบชำระ" && "bg-muted"
        )}
      >
        {/* Profile Image and Loan Info */}
        <View className="flex flex-col gap-2">
          <View className="justify-between flex flex-row">
            <View className="flex-row items-center space-x-4">
              {/* 
              Profile Image 
              TODO: change to placeholder
              */}

              <AvatarText
                title={`เลขสัญญา ${loan.loanNumber}`}
                textClassName={cn(LABEL, "text-muted-foreground")}
                placeholder={loan.nickname?.toString().slice(0, 2)}
                url={loan.profileImage}
              >
                <Text className={cn(PARAGRAPH, "text-foreground")}>
                  {loan.nickname + "  "}

                  {loan.firstName && loan.lastName && (
                    <Text className="text-muted-foreground font-ibm text-sm">
                      {loan.firstName + " " + loan.lastName}
                    </Text>
                  )}
                </Text>
              </AvatarText>
              {/* Loan Info */}
            </View>
            {/* Loan Status */}
            <View className="flex-row flex gap-2">
              {/* TODO: dont forget status */}
              <Status status={loan.status} />
              <LoanCardMenu
                openInfoSheet={openDebtorModal}
                openGuarantorSheet={openGuarantorSheet}
                debtorId={loan.debtorId}
                loanId={loan.id}
              />
            </View>
          </View>
          {/* Outstanding Amount and Progress Bar with Total Amount on the Right */}

          <View
            className={cn(
              "flex-row gap-2 content-center justify-center items-center"
            )}
          >
            {/* Progress Bar */}
            <ProgressText
              textStart={formatMoney(paidAmount)}
              textEnd={formatMoney(loan.total)}
              percentage={Math.round((paidAmount / loan.total) * 100)}
              className="flex-1"
            />
            {/* Due Date */}
            <Text className={cn(TITLE, "text-muted-foreground text-sm mt-1")}>
              ชำระทุก {timestampToDate(loan.dueDate)}
            </Text>
          </View>
        </View>
        {/* Action Buttons */}
        <View className="flex-row justify-between items-center mt-3 space-x-2 mb- gap-1">
          {loan.status !== "ครบชำระ" ? (
            <>
              {/* Remind Button with Icon */}
              {/* TODO: notfication reminder */}
              <IconButton
                className="flex-1"
                variant="outline"
                onPress={sendReminder}
                disabled={sending}
                icon={<Icon name="Send" size={20} />}
                text="ทวงหนี้"
              />
              {/* Memo Button */}
              <IconButton
                className="flex-1"
                onPress={openMemoSheet}
                icon={<Icon name="NotebookPen" size={20} />}
                text="บันทึกรายการ"
              />
            </>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};
