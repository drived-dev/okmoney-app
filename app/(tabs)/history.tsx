import React from "react";
import { View, Text } from "react-native";
import HistoryPage from "~/components/history/history-page";
import { SafeAreaView } from "react-native";
import OnlineOnly from "~/components/online-only";
import { getPaymentHistory } from "~/api/payment/get-history-all";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "~/types/payment-history";

const History = () => {
  const {
    data: paymentHistory = [] as PaymentHistory[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: () => getPaymentHistory(),
  });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return <HistoryPage name="สมชาย" nickname="ธาม" data={paymentHistory} />;
};

export default OnlineOnly(History);
