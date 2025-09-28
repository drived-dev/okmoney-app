import React from "react";
import { View, Text } from "react-native";
import HistoryPage from "~/components/history/history-page";
import { SafeAreaView } from "react-native";
import OnlineOnly from "~/components/online-only";
import { getPaymentHistory } from "~/api/payment/get-history-all";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "~/types/payment-history";
import { useLocalSearchParams } from "expo-router";
import LoadingScreen from "~/components/loading-screen";

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
    return <LoadingScreen />;
  }
  console.log(paymentHistory);

  return <HistoryPage data={paymentHistory} />;
};

export default OnlineOnly(History);
