import React from "react";
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

  const paidAmount = loan.principal - loan.remainingBalance;
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
              <Image
                source={{ uri: loan.profileImage }}
                className="w-12 h-12 rounded-full"
              />
              {/* Loan Info */}
              <View>
                {loan.loanNumber && (
                  <Text className={cn(LABEL, "text-muted-foreground pl-2")}>
                    เลขสัญญา {loan.loanNumber}
                  </Text>
                )}
                {/* Name: Bold nickname, gray full name */}
                <Text className={cn(PARAGRAPH, "pl-2 text-foreground ")}>
                  {loan.nickname + "  "}

                  {loan.firstName && loan.lastName && (
                    <Text className="text-muted-foreground font-ibm text-sm">
                      {loan.firstName + " " + loan.lastName}
                    </Text>
                  )}
                </Text>
              </View>
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
              percentage={Math.round((paidAmount / loan.principal) * 100)}
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
