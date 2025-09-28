import RevenueCatUI from "react-native-purchases-ui";
import Purchases from "react-native-purchases";
import CloseButton from "~/components/close-button";
import { View } from "react-native";
import SubscriptionStatusComponent from "~/components/subscriptionstatus";
import SubscriptionChecker from "~/components/subscriptioncheck";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-[#181717]">
      <CloseButton className="ml-4" />
      <RevenueCatUI.Paywall />
      <SubscriptionChecker />
      {/* <SubscriptionStatusComponent /> */}
    </SafeAreaView>
  );
};

export default index;
