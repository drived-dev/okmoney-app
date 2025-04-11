import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Purchases from "react-native-purchases";

const SubscriptionStatusComponent = () => {
  const [loading, setLoading] = useState(true);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptionInfo();
  }, []);

  const fetchSubscriptionInfo = async () => {
    try {
      setLoading(true);
      const customerInfo = await Purchases.getCustomerInfo();
      // Process subscription information
      const subscriptions = {
        hasActiveSubscription:
          Object.values(customerInfo.entitlements.active).length > 0,
        activeEntitlements: Object.keys(customerInfo.entitlements.active),
        allEntitlements: customerInfo.entitlements.all,
        activeSubscriptions: customerInfo.activeSubscriptions,
        allPurchasedProductIds: customerInfo.allPurchasedProductIdentifiers,
        latestExpirationDate: customerInfo.latestExpirationDate,
      };
      setSubscriptionInfo(subscriptions);
      setLoading(false);
    } catch (err) {
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
          {subscriptionInfo.hasActiveSubscription ? "Yes" : "No"}
        </Text>
      </View>
      {subscriptionInfo.hasActiveSubscription && (
        <>
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
