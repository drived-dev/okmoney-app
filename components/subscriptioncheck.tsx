import React, { useEffect } from "react";
import { Alert } from "react-native";
import Purchases from "react-native-purchases";
import { patchUser } from "~/api/auth/patch-user";
import useUserStore from "~/store/use-user-store";
import { getUser } from "~/api/auth/get-user";

// Define interfaces for type safety
interface SubscriptionInfo {
  hasActiveSubscription: boolean;
  activeEntitlements: string[];
  allEntitlements: Record<string, any>;
  activeSubscriptions: string[];
  allPurchasedProductIds: string[];
  latestExpirationDate: string | null;
  purchaseDates: Record<string, string>;
  planName?: string;
  purchaseDate?: string;
  purchaseTimestamp?: number;
}

const SubscriptionChecker: React.FC = () => {
  const { setUser, accessToken, refreshToken } = useUserStore();
  useEffect(() => {
    const handleNewPurchase = async (customerInfo: any) => {
      try {
        // Get current Unix timestamp in seconds
        const currentTimestamp = Math.floor(Date.now() / 1000);

        // Process subscription information as before
        const purchaseDates: Record<string, string> =
          customerInfo.allPurchaseDatesByProduct || {};

        const subscriptions: SubscriptionInfo = {
          hasActiveSubscription:
            Object.values(customerInfo.entitlements.active).length > 0,
          activeEntitlements: Object.keys(customerInfo.entitlements.active),
          allEntitlements: customerInfo.entitlements.all,
          activeSubscriptions: customerInfo.activeSubscriptions,
          allPurchasedProductIds: customerInfo.allPurchasedProductIdentifiers,
          latestExpirationDate: customerInfo.latestExpirationDate,
          purchaseDates: purchaseDates,
          purchaseTimestamp: currentTimestamp,
        };

        // Determine current plan based on active subscriptions
        let currentPlan: string | null = null;
        let purchaseDate: string | null = null;

        if (
          subscriptions.activeSubscriptions &&
          subscriptions.activeSubscriptions.length > 0
        ) {
          for (const subscription of subscriptions.activeSubscriptions) {
            if (
              subscription === "com.small_plan.okmoney" ||
              subscription === "ok_money_premium_plan:small-plan"
            ) {
              currentPlan = "SMALL";
              break;
            } else if (
              subscription === "com.med_plan.okmoney" ||
              subscription === "ok_money_premium_plan:medium-plan"
            ) {
              currentPlan = "MEDIUM";
              break;
            } else if (
              subscription === "com.large_plan.okmoney" ||
              subscription === "ok_money_premium_plan:large-plan"
            ) {
              currentPlan = "LARGE";
              break;
            }
          }

          if (!currentPlan) {
            currentPlan = "FREE";
          }
        } else {
          currentPlan = "FREE";
        }

        // Add plan name to subscription info for display
        subscriptions.planName = currentPlan || undefined;
        subscriptions.purchaseDate = purchaseDate || undefined;

        // Only update if we have an active subscription and plan
        if (subscriptions.hasActiveSubscription && currentPlan) {
          // Update user information with the Unix timestamp
          const response = await patchUser({
            rolePackage: currentPlan,
            packageUpdateAt: subscriptions.purchaseTimestamp,
          });

          // Alert.alert(response.status.toString());

          if (response.status === 200) {
            const fetch = await getUser();
            const userData = fetch.data;
            setUser(userData);
            console.log(
              "Purchase detected! Subscription updated with timestamp:",
              subscriptions.purchaseTimestamp
            );
          } else {
            console.error("Failed to update user information after purchase");
          }
        }
      } catch (err: any) {
        console.error(`Error handling purchase: ${err.message}`);
      }
    };

    // Set up purchase listener to catch real-time purchases only
    Purchases.addCustomerInfoUpdateListener(handleNewPurchase);

    // Clean up the listener when component unmounts
    return () => {
      Purchases.removeCustomerInfoUpdateListener(handleNewPurchase);
    };
  }, []);

  // Component doesn't render anything
  return null;
};

export default SubscriptionChecker;
