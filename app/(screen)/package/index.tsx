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
import { CONTAINER, GRID_ROW, GRID } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { X, Users, MessageSquare, PieChart, Check } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { black } from "tailwindcss/colors";
import { router } from "expo-router";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import * as RNIap from "react-native-iap";

// Define the in-app purchase product IDs for each platform
const productIds = Platform.select({
  ios: ["com.yourapp.productid.ios"], // Replace with your actual iOS product ID
  android: ["com.yourapp.productid.android"], // Replace with your actual Android product ID
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

// Define the interface for a feature
interface Feature {
  icon: React.ReactNode; // Icon as a React Node (could be any component)
  label: string; // Label of the feature
  detail?: string; // Optional detail text
}

// Define the props interface for ItemList
interface ItemListProps {
  packageName: string; // Package name
  price: number; // Package price
  features: Feature[]; // Array of features
  recommended?: boolean; // Recommended flag
  selected?: boolean; // Whether the item is selected
  onPress: () => void; // Function to handle press
}

// ItemList Component with Props Interface
const ItemList: React.FC<ItemListProps> = ({
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
      toValue: selected ? 1.05 : 1, // More subtle scaling
      duration: 300, // Smooth animation
      useNativeDriver: true,
    }).start();
  }, [selected]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
        }}
        className={cn(
          "relative flex flex-row justify-between w-full bg-slate-300 px-4 py-4 rounded-2xl"
        )}
      >
        {recommended && (
          <View className="absolute top-0 left-0 bg-red-500 rounded-full px-3 py-1 z-10 transform -translate-y-1/2 translate-x-2">
            <Text className="text-white font-bold">Recommended</Text>
          </View>
        )}

        {selected && (
          <View className="absolute top-0 right-0 bg-green-500 rounded-full p-1 z-10 transform -translate-y-2 translate-x-2">
            <Check color={"white"} size={16} />
          </View>
        )}

        <View className={cn(GRID, "justify-between")}>
          <Text className={cn(TITLE, "pt-2")}>{packageName}</Text>
          <View className="flex flex-row">
            <Text className={cn(TITLE, "")}>฿{price}</Text>
            <Text className={cn(LABEL, "")}>/เดือน</Text>
          </View>
        </View>
        <View className="flex flex-col gap-2">
          {features.map((feature, index) => (
            <View key={index} className={cn(GRID_ROW, "items-center")}>
              {feature.icon}
              <Text className={cn(LABEL, "")}>{feature.label}</Text>
              {feature.detail && (
                <Text className={cn(PARAGRAPH, "")}>{feature.detail}</Text>
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const index: React.FC = () => {
  const [selectedPackageDetails, setSelectedPackageDetails] = useState<{
    packageName: string;
    price: number;
  } | null>(null);

  // Data for packages
  const packages = [
    {
      packageName: "เล็ก",
      price: 129,
      features: [
        { icon: <Users color={"white"} />, label: "ลูกหนี้", detail: "30 คน" },
        {
          icon: <MessageSquare color={"white"} />,
          label: "SMS",
          detail: "60 ครั้ง",
        },
        { icon: <PieChart color={"white"} />, label: "แดชบอร์ด" },
      ],
      recommended: false,
    },
    {
      packageName: "กลาง",
      price: 129,
      features: [
        { icon: <Users color={"white"} />, label: "ลูกหนี้", detail: "30 คน" },
        {
          icon: <MessageSquare color={"white"} />,
          label: "SMS",
          detail: "60 ครั้ง",
        },
        { icon: <PieChart color={"white"} />, label: "แดชบอร์ด" },
      ],
      recommended: true,
    },
    {
      packageName: "ใหญ่",
      price: 129,
      features: [
        { icon: <Users color={"white"} />, label: "ลูกหนี้", detail: "30 คน" },
        {
          icon: <MessageSquare color={"white"} />,
          label: "SMS",
          detail: "60 ครั้ง",
        },
        { icon: <PieChart color={"white"} />, label: "แดชบอร์ด" },
      ],
      recommended: false,
    },
  ];

  useEffect(() => {
    initializeIAPConnection(); // Initialize IAP on component mount
  }, []);

  const handleSelectPackage = (pkg: { packageName: string; price: number }) => {
    setSelectedPackageDetails(
      pkg.packageName === selectedPackageDetails?.packageName ? null : pkg
    );
  };

  // Handle in-app purchase
  const handleButtonPress = async () => {
    try {
      if (!productIds || !selectedPackageDetails) {
        console.error("Product ID or package details missing");
        return;
      }

      const products = await RNIap.getProducts(productIds);
      if (products.length > 0) {
        const purchase = await RNIap.requestPurchase(productIds[0]);
        console.log("Purchase successful:", purchase.transactionId);
        alert("Success");
      }
    } catch (err) {
      console.error("Error with purchase:", err);
      alert("Fail");
    }
  };

  return (
    <View className="flex-1 justify-between">
      <SafeAreaView>
        <View className={cn(CONTAINER, "")}>
          <Button
            variant={"green"}
            size={"icon-lg"}
            onPress={() => router.back()}
          >
            <X color={black} />
          </Button>

          <View className="items-center justify-center px-2 flex flex-col gap-2">
            <View>
              <Text className={cn(TITLE, "")}>เลือกแพคเกจ</Text>
            </View>
            <View className={cn(GRID, "")}>
              {packages.map((pkg, index) => (
                <ItemList
                  key={index}
                  packageName={pkg.packageName}
                  price={pkg.price}
                  features={pkg.features}
                  recommended={pkg.recommended}
                  selected={
                    selectedPackageDetails?.packageName === pkg.packageName
                  }
                  onPress={() => handleSelectPackage(pkg)}
                />
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* Bottom button */}
      <View className="p-5 pb-10">
        <TouchableOpacity
          disabled={!selectedPackageDetails}
          onPress={handleButtonPress}
          className={cn(
            "rounded-lg p-4 items-center",
            selectedPackageDetails ? "bg-orange-500" : "bg-gray-300"
          )}
        >
          <Text className={cn(PARAGRAPH, "text-background")}>สมัครเลย</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
