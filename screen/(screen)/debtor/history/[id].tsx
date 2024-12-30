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
import useLoanStore from "~/store/use-loan-store";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
const History = () => {
  const { id } = useLocalSearchParams();
  const debtorId = id as string;
  const loan = useLoanStore().getLoanByDebtorId(debtorId);
  // TODO: fix api endpoint to id then return debtor name
  const {
    data: paymentHistory = [] as PaymentHistory[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["paymentHistory", debtorId],
    queryFn: () => getPaymentHistoryByDebtorId(debtorId),
  });

  if (error) {
    console.error(error);
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <CloseButton className="ml-2" />

      <HistoryPage
        name={`${loan?.firstName || ""} ${loan?.lastName || ""}`}
        nickname={loan?.nickname}
        data={paymentHistory}
      />
    </SafeAreaView>
  );
};

export default OnlineOnly(History);
