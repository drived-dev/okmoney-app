// import React, { useEffect, useState } from "react";
// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
//   Platform,
//   TouchableOpacity,
//   SafeAreaView,
//   ActivityIndicator,
// } from "react-native";

// import {
//   PurchaseError,
//   requestSubscription,
//   useIAP,
//   validateReceiptIos,
// } from "react-native-iap";
// import { ITUNES_SHARED_SECRET } from "@env";

// const errorLog = ({ message, error }) => {
//   console.error("An error happened", message, error);
// };

// const isIos = Platform.OS === "ios";

// const subscriptionSkus = Platform.select({
//   ios: ["com.small_plan.okmoney"],
// });

// const Index = () => {
//   const {
//     connected,
//     subscriptions,
//     getSubscriptions,
//     currentPurchase,
//     finishTransaction,
//     purchaseHistory,
//     getPurchaseHistory,
//   } = useIAP();

//   const [loading, setLoading] = useState(false);

//   const ITUNES_SHARED_SECRET = process.env.ITUNES_SHARED_SECRET;

//   const handleGetPurchaseHistory = async () => {
//     try {
//       await getPurchaseHistory();
//     } catch (error) {
//       errorLog({ message: "handleGetPurchaseHistory", error });
//     }
//   };

//   useEffect(() => {
//     handleGetPurchaseHistory();
//   }, [connected]);

//   const handleGetSubscriptions = async () => {
//     try {
//       await getSubscriptions({ skus: subscriptionSkus });
//     } catch (error) {
//       errorLog({ message: "handleGetSubscriptions", error });
//     }
//   };

//   useEffect(() => {
//     handleGetSubscriptions();
//   }, [connected]);

//   const handleBuySubscription = async (productId) => {
//     try {
//       await requestSubscription({
//         sku: productId,
//       });
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       if (error instanceof PurchaseError) {
//         errorLog({ message: `[${error.code}]: ${error.message}`, error });
//       } else {
//         errorLog({ message: "handleBuySubscription", error });
//       }
//     }
//   };

//   useEffect(() => {
//     const checkCurrentPurchase = async (purchase) => {
//       if (purchase) {
//         try {
//           const receipt = purchase.transactionReceipt;
//           if (receipt) {
//             if (Platform.OS === "ios") {
//               const isTestEnvironment = __DEV__;
//               const appleReceiptResponse = await validateReceiptIos(
//                 {
//                   "receipt-data": receipt,
//                   password: ITUNES_SHARED_SECRET,
//                 },
//                 isTestEnvironment
//               );
//             }
//           }
//         } catch (error) {
//           console.log("error", error);
//         }
//       }
//     };
//     checkCurrentPurchase(currentPurchase);
//   }, [currentPurchase, finishTransaction]);

//   return (
//     <SafeAreaView>
//       <ScrollView>
//         <View style={{ padding: 10 }}>
//           <Text
//             style={{
//               fontSize: 28,
//               textAlign: "center",
//               paddingBottom: 15,
//               color: "black",
//               fontWeight: "bold",
//             }}
//           >
//             Subscribe
//           </Text>
//           <Text style={styles.listItem}>
//             Subscribe to some cool stuff today.
//           </Text>
//           <Text
//             style={{
//               fontWeight: "500",
//               textAlign: "center",
//               marginTop: 10,
//               fontSize: 18,
//             }}
//           >
//             Choose your membership plan.
//           </Text>
//           <View style={{ marginTop: 10 }}>
//             {subscriptions.map((subscription, index) => {
//               const owned = purchaseHistory.find(
//                 (s) => s?.productId === subscription.productId
//               );
//               console.log("subscriptions", subscription?.productId);
//               return (
//                 <View style={styles.box} key={index}>
//                   {subscription?.introductoryPriceSubscriptionPeriodIOS && (
//                     <Text style={styles.specialTag}>SPECIAL OFFER</Text>
//                   )}
//                   <View
//                     style={{
//                       flex: 1,
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       marginTop: 10,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         paddingBottom: 10,
//                         fontWeight: "bold",
//                         fontSize: 18,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {subscription?.title}
//                     </Text>
//                     <Text
//                       style={{
//                         paddingBottom: 20,
//                         fontWeight: "bold",
//                         fontSize: 18,
//                       }}
//                     >
//                       {subscription?.localizedPrice}
//                     </Text>
//                   </View>
//                   <Text style={{ paddingBottom: 20 }}>
//                     {subscription?.description}
//                   </Text>
//                   {loading && <ActivityIndicator size="large" />}
//                   {!loading && !owned && isIos && (
//                     <TouchableOpacity
//                       style={styles.button}
//                       onPress={() => {
//                         setLoading(true);
//                         handleBuySubscription(subscription.productId);
//                       }}
//                     >
//                       <Text style={styles.buttonText}>Subscribe</Text>
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               );
//             })}
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//   },
//   listItem: {
//     fontSize: 16,
//     paddingLeft: 8,
//     paddingBottom: 3,
//     textAlign: "center",
//     color: "black",
//   },
//   box: {
//     margin: 10,
//     marginBottom: 5,
//     padding: 10,
//     backgroundColor: "white",
//     borderRadius: 7,
//     shadowColor: "rgba(0, 0, 0, 0.45)",
//     shadowOffset: { height: 16, width: 0 },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//   },
//   button: {
//     alignItems: "center",
//     backgroundColor: "mediumseagreen",
//     borderRadius: 8,
//     padding: 10,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "white",
//     textTransform: "uppercase",
//   },
//   specialTag: {
//     color: "white",
//     backgroundColor: "crimson",
//     width: 125,
//     padding: 4,
//     fontWeight: "bold",
//     fontSize: 12,
//     borderRadius: 7,
//     marginBottom: 2,
//   },
// });

// export default Index;
