import RevenueCatUI from "react-native-purchases-ui";
import Purchases from "react-native-purchases";
import CloseButton from "~/components/close-button";
import { SafeAreaView, View } from "react-native";
import SubscriptionStatusComponent from "~/components/subscriptionstatus";
import SubscriptionChecker from "~/components/subscriptioncheck";

const index = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <CloseButton className="ml-4" />
      <RevenueCatUI.Paywall />
      <SubscriptionChecker />
      {/* <SubscriptionStatusComponent /> */}
    </SafeAreaView>
  );
};

export default index;
