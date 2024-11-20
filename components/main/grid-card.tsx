import React from "react";
import { View, Image, Text } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { Loan } from "~/types/Loan";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import { LoanCardMenu } from "./loan-card-menu";
import useEditingLoanStore from "~/store/use-editing-loan-store";
import { DebtorName } from "../debtor-name";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CircularProgressProps {
  size: number; // The size of the circle
  strokeWidth: number; // The thickness of the progress bar
  progress: number; // The current progress value
  maxProgress: number; // The maximum value for progress (e.g., 100%)
  imageUri: string; // The URI for the image in the center
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  maxProgress,
  imageUri,
}) => {
  const increasedSize = size + 20; // This increases the overall size of the progress bar (add more if you need more space)
  const radius = (increasedSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * progress) / maxProgress;

  const strokeDashArray = `${circumference * 0.75}, ${circumference}`; // 75% of the circle (240 degrees)

  return (
    <View className="relative justify-center items-center">
      <Svg width={increasedSize} height={increasedSize} className="absolute">
        <Defs>
          {/* Define the linear gradient at 135 degrees */}
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#8F4F20" stopOpacity="1" />
            <Stop offset="100%" stopColor="#F58737" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Static Background Circle */}
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={increasedSize / 2}
          cy={increasedSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDashArray}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(135 ${increasedSize / 2} ${increasedSize / 2})`}
        />

        {/* Dynamic Progress Circle with Linear Gradient */}
        <Circle
          stroke="url(#grad)"
          fill="none"
          cx={increasedSize / 2}
          cy={increasedSize / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDashArray}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(135 ${increasedSize / 2} ${increasedSize / 2})`}
        />
      </Svg>

      {/* Profile Image */}
      <View className="absolute justify-center items-center">
        <Avatar
          alt="user avatar"
          style={{
            width: size - strokeWidth * 2,
            height: size - strokeWidth * 2,
            borderRadius: (size - strokeWidth * 2) / 2,
          }}
        >
          <AvatarImage source={{ uri: imageUri }} />
          <AvatarFallback>
            <Text className={cn(PARAGRAPH, "text-foreground")}>
              {imageUri?.slice(0, 2)}
            </Text>
          </AvatarFallback>
        </Avatar>
      </View>
    </View>
  );
};

interface GridComponentProps {
  loans: Loan[];
  onMemo: () => void;
  onGuarantor: () => void;
}

export const GridComponent: React.FC<GridComponentProps> = ({
  loans,
  onMemo,
  onGuarantor,
}) => {
  const { setId } = useEditingLoanStore();
  return (
    <View className={cn("flex flex-row flex-wrap justify-between ")}>
      {loans.map((loan, index) => {
        function openGuarantorSheet() {
          setId(loan.id);
          onGuarantor();
        }
        return (
          <View
            key={loan.id}
            className="bg-white p-1 rounded-2xl shadow-sm mb-4 border border-gray-200"
            style={{
              width: "48%",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
              marginBottom: 15,
              marginRight: index % 2 === 0 ? 10 : 0,
            }}
          >
            <View className="relative justify-center items-center">
              <View className="absolute top-0 right-0">
                <LoanCardMenu
                  openGuarantorSheet={openGuarantorSheet}
                  debtorId={loan.id}
                />
              </View>
              <View className="mt-3">
                {/* Circular Progress Bar with Profile Image Inside */}
                <CircularProgress
                  size={80}
                  strokeWidth={12}
                  progress={Math.round((loan.outstanding / loan.total) * 100)}
                  maxProgress={100}
                  imageUri={loan.profileImage}
                />
              </View>
            </View>

            {/* Text content */}
            <View className="items-center justify-center">
              <Text className={cn(PARAGRAPH, "text-sm text-gray-500")}>
                เลขสัญญา {loan.loanNumber}
              </Text>
              <DebtorName
                name={loan.name}
                nickname={loan.nickname}
              ></DebtorName>
            </View>
          </View>
        );
      })}
    </View>
  );
};
