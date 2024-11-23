import {
  View,
  Text,
  SafeAreaView,
  Animated,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { X, Users, MessageSquare, PieChart, Check } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import * as RNIap from "react-native-iap";
import { router } from "expo-router";
import { cn } from "~/lib/utils";
import { GRID } from "~/constants/Styles";

// Define subscription product IDs for each platform
const subscriptionIds = Platform.select({
  ios: ["small_sub", "med_sub", "large_sub"], // iOS Product IDs
  android: ["small_sub", "med_sub", "large_sub"], // Android Product IDs
});

// Initialize the in-app purchase connection
const initializeIAPConnection = async () => {
  try {
    await RNIap.initConnection();
    console.log("IAP connection initialized");
  } catch (err) {
    console.error("Error initializing IAP connection:", err);
  }
};

// Define the props interface for ItemList
const ItemList = ({
  packageName,
  price,
  features,
  recommended,
  selected,
  onPress,
}) => {
  const scaleValue = new Animated.Value(selected ? 1.05 : 1);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: selected ? 1.05 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
        className={`relative flex flex-row justify-between w-full bg-gray-200 px-4 py-4 rounded-xl ${
          selected ? "border-2 border-orange-500" : ""
        }`}
      >
        {recommended && (
          <View className="absolute top-0 left-0 bg-red-500 rounded-full px-3 py-1 z-10 transform -translate-y-1/2 translate-x-2">
            <Text className="text-white font-bold">Recommended</Text>
          </View>
        )}

        <View className="flex-1">
          <Text className="font-bold text-lg">{packageName}</Text>
          <Text className="text-gray-500">฿{price} / month</Text>
        </View>

        <View className="flex gap-2">
          {features.map((feature, index) => (
            <View key={index} className="flex flex-row items-center">
              {feature.icon}
              <Text className="ml-2">{feature.label}</Text>
            </View>
          ))}
        </View>

        {selected && (
          <View className="absolute top-0 right-0 bg-green-500 p-1 rounded-full transform translate-x-2 -translate-y-2">
            <Check color="white" size={16} />
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const Index = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const packages = [
    {
      packageName: "Small Plan",
      price: 129,
      features: [
        { icon: <Users color="black" />, label: "30 Users" },
        { icon: <MessageSquare color="black" />, label: "60 SMS" },
        { icon: <PieChart color="black" />, label: "Basic Dashboard" },
      ],
      id: "small_sub", // Product ID for Small Plan
    },
    {
      packageName: "Medium Plan",
      price: 299,
      features: [
        { icon: <Users color="black" />, label: "100 Users" },
        { icon: <MessageSquare color="black" />, label: "200 SMS" },
        { icon: <PieChart color="black" />, label: "Advanced Dashboard" },
      ],
      id: "med_sub", // Product ID for Medium Plan
      recommended: true, // Mark as recommended
    },
    {
      packageName: "Large Plan",
      price: 499,
      features: [
        { icon: <Users color="black" />, label: "500 Users" },
        { icon: <MessageSquare color="black" />, label: "Unlimited SMS" },
        { icon: <PieChart color="black" />, label: "Premium Dashboard" },
      ],
      id: "large_sub", // Product ID for Large Plan
    },
  ];

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const availableSubscriptions = await RNIap.getSubscriptions(
          subscriptionIds
        );
        setSubscriptions(availableSubscriptions);
        console.log("Available subscriptions:", availableSubscriptions);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      }
    };

    initializeIAPConnection();
    fetchSubscriptions();
  }, []);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg.id === selectedPackage?.id ? null : pkg);
  };

  const handleSubscription = async () => {
    if (!selectedPackage) {
      alert("Please select a subscription plan!");
      return;
    }

    try {
      const productId = selectedPackage.id; // Get the product ID from the selected package
      const purchase = await RNIap.requestSubscription(productId);
      console.log("Subscription successful:", purchase);
      alert("Subscription Successful!");
    } catch (err) {
      console.error("Error with subscription:", err);
      alert("Subscription Failed!");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Button
          variant={"ghost"}
          size={"icon-lg"}
          onPress={() => router.back()}
          className="mb-4"
        >
          <X color="black" />
        </Button>

        <Text className="text-xl font-bold mb-4">Choose Your Plan</Text>

        <View className={cn(GRID, "")}>
          {packages.map((pkg) => (
            <ItemList
              key={pkg.id}
              packageName={pkg.packageName}
              price={pkg.price}
              features={pkg.features}
              recommended={pkg.recommended}
              selected={selectedPackage?.id === pkg.id}
              onPress={() => handleSelectPackage(pkg)}
            />
          ))}
        </View>
      </View>

      <View className="p-4 pb-10">
        <TouchableOpacity
          className={`${
            selectedPackage ? "bg-orange-500" : "bg-gray-300"
          } rounded-lg py-3`}
          onPress={handleSubscription}
          disabled={!selectedPackage}
        >
          <Text className="text-center text-white text-lg">Subscribe Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
