import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Purchases from "react-native-purchases";
import { patchUser } from "~/api/auth/patch-user";
import useUserStore from "~/store/use-user-store";

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
}

interface UserData {
  storeName: string;
  phoneNumber: string;
  // Add other user properties as needed
}

interface ApiResponse {
  status: number;
  data: UserData;
}

const SubscriptionStatusComponent: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptionInfo, setSubscriptionInfo] =
    useState<SubscriptionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const user = useUserStore.getState() as UserData;
  const setUser = useUserStore.getState().setUser;
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const fetchSubscriptionInfo = async (): Promise<void> => {
    try {
      setLoading(true);
      const customerInfo = await Purchases.getCustomerInfo();

      // Get purchase dates for subscription products
      const purchaseDates: Record<string, string> =
        customerInfo.allPurchaseDatesByProduct || {};

      // Process subscription information
      const subscriptions: SubscriptionInfo = {
        hasActiveSubscription:
          Object.values(customerInfo.entitlements.active).length > 0,
        activeEntitlements: Object.keys(customerInfo.entitlements.active),
        allEntitlements: customerInfo.entitlements.all,
        activeSubscriptions: customerInfo.activeSubscriptions,
        allPurchasedProductIds: customerInfo.allPurchasedProductIdentifiers,
        latestExpirationDate: customerInfo.latestExpirationDate,
        purchaseDates: purchaseDates,
      };

      // Determine current plan based on active subscriptions
      let currentPlan: string | null = null;
      let purchaseDate: string | null = null;

      if (
        subscriptions.activeSubscriptions &&
        subscriptions.activeSubscriptions.length > 0
      ) {
        // Check for the plan in active subscriptions
        for (const subscription of subscriptions.activeSubscriptions) {
          if (subscription === "com.small_plan.okmoney") {
            currentPlan = "SMALL";
          } else if (subscription === "com.med_plan.okmoney") {
            currentPlan = "MEDIUM";
          } else if (subscription === "com.large_plan.okmoney") {
            currentPlan = "LARGE";
          }

          // Get purchase date for this subscription if available
          if (currentPlan && purchaseDates[subscription]) {
            purchaseDate = purchaseDates[subscription];
            break; // Use the first match we find
          }
        }
      }

      // Add plan name to subscription info for display
      subscriptions.planName = currentPlan || undefined;
      subscriptions.purchaseDate = purchaseDate || undefined;

      // Update user information if we found an active plan
      let response: ApiResponse;

      if (currentPlan && purchaseDate) {
        response = await patchUser({
          rolePackage: currentPlan,
          packageUpdateAt: new Date(purchaseDate).toISOString(),
        });
      } else {
        // Fallback to using existing user data if we couldn't determine the plan
        response = await patchUser({
          rolePackage: user.storeName,
          packageUpdateAt: user.phoneNumber,
        });
      }

      if (response.status === 200) {
        setUser(response.data);
      } else {
        setIsError(true);
      }

      setSubscriptionInfo(subscriptions);
      setLoading(false);
    } catch (err: any) {
      setError(`Error fetching subscription info: ${err.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading subscription information...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={fetchSubscriptionInfo}
        >
          <Text style={styles.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subscription Status</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Active Subscription:</Text>
        <Text style={styles.value}>
          {subscriptionInfo?.hasActiveSubscription ? "Yes" : "No"}
        </Text>
      </View>
      {subscriptionInfo?.hasActiveSubscription && (
        <>
          {subscriptionInfo.planName && (
            <View style={styles.infoContainer}>
              <Text style={styles.label}>Plan:</Text>
              <Text style={styles.value}>{subscriptionInfo.planName}</Text>
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Purchase Date:</Text>
            <Text style={styles.value}>
              {subscriptionInfo.purchaseDate
                ? new Date(subscriptionInfo.purchaseDate).toLocaleDateString()
                : "Not available"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Active Entitlements:</Text>
            <Text style={styles.value}>
              {subscriptionInfo.activeEntitlements.join(", ") || "None"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Active Subscriptions:</Text>
            <Text style={styles.value}>
              {subscriptionInfo.activeSubscriptions.join(", ") || "None"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Expiration Date:</Text>
            <Text style={styles.value}>
              {subscriptionInfo.latestExpirationDate
                ? new Date(
                    subscriptionInfo.latestExpirationDate
                  ).toLocaleDateString()
                : "N/A"}
            </Text>
          </View>
        </>
      )}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchSubscriptionInfo}
        disabled={loading}
      >
        <Text style={styles.refreshButtonText}>
          {loading ? "Refreshing..." : "Refresh Subscription Status"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.refreshNote}>You can also pull down to refresh</Text>
      {isError && (
        <Text style={styles.errorText}>
          Failed to update user information. Please try again.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  label: {
    flex: 1,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  text: {
    marginTop: 10,
    textAlign: "center",
  },
  refreshNote: {
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
    color: "#777",
  },
  refreshButton: {
    backgroundColor: "#4a90e2",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  refreshButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default SubscriptionStatusComponent;
