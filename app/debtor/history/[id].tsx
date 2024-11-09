import React from "react";
import { View, Text } from "react-native";
import HistoryPage from "~/components/history/history-page";
import { SafeAreaView } from "react-native";
import OnlineOnly from "~/components/online-only";
import {
  getPaymentHistory,
  getPaymentHistoryByDebtorId,
} from "~/api/payment/get-history-all";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "~/types/payment-history";
import { useLocalSearchParams } from "expo-router";
import CloseButton from "~/components/close-button";
import { router } from "expo-router";
const History = () => {
  const { id } = useLocalSearchParams();

  // TODO: fix api endpoint to id then return debtor name
  const {
    data: paymentHistory = [] as PaymentHistory[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", id],
    queryFn: () => getPaymentHistoryByDebtorId(id as string),
  });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <CloseButton className="mb-4" />
      <HistoryPage name="สมชาย" nickname="ธาม" data={paymentHistory} />
    </SafeAreaView>
  );
};

export default OnlineOnly(History);
