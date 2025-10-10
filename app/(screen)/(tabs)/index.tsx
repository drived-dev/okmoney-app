import { Link, router, useNavigation } from "expo-router";
import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { LoanCard } from "~/components/main/loan-card";
import { Searchbar } from "~/components/main/search_bar";
import { AvatarText } from "~/components/avatar-text";
import { IconButton } from "~/components/icon-button";
import { NotebookPen, Plus } from "lucide-react-native";
import { GridComponent } from "~/components/main/grid-card";
import useLoanStore from "~/store/use-loan-store";
import useFilterStore from "~/store/use-filter-store";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/icon";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Form } from "~/components/form";
import { Textarea } from "~/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { FormLabel, FormItem, FormMessage } from "~/components/form";
import { TITLE } from "~/constants/Typography";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "~/components/ui/input";
import MemoSheet from "~/components/main/memo-sheet";
import GuarantorSheet from "~/components/main/guarantor-sheet";
import DebtorModal from "~/components/main/debtor-info-modal";
import { Drawer } from "react-native-drawer-layout";
import useUserStore from "~/store/use-user-store";
import { Loan } from "~/types/Loan";
import { useQuery } from "@tanstack/react-query";
import { PaymentHistory } from "~/types/payment-history";
import { getLoanAll } from "~/api/loans/get-loan-all";
import { parseLoansDatas } from "~/lib/parse-loan-datas";
import Toast from "react-native-toast-message";
import FilterDrawerContent from "~/components/filter-drawer-content";
import DebtorErrorBoundary from "~/components/DebtorErrorBoundary";

const amountMemoSchema = z.object({
  amount: z.string().max(100).optional(),
  // image: z.array(z.string()).optional(),
});

const statusAlias: Record<string, string> = {
  OVERDUE: "ค้างชำระ",
  CLOSED: "ครบชำระ",
  DUE: "รอชำระ",
  UNDERDUE: "ใกล้กำหนด",
};

const Index = () => {
  const { loans, fetchLoans, isLoading, error } = useLoanStore();

  // Initial load of loans
  useEffect(() => {
    const loadLoans = async () => {
      try {
        await fetchLoans();
      } catch (error) {
        console.error("Error loading loans:", error);
        // Error will be handled by the store's error state
      }
    };
    loadLoans();
  }, [fetchLoans]);

  // Show loading state
  if (isLoading && loans.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2">กำลังโหลดข้อมูลลูกหนี้...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <View className="items-center justify-center bg-red-50 rounded-2xl p-6 mx-4">
          <Text className="text-red-600 text-center mb-4 font-medium text-lg">
            เกิดข้อผิดพลาด
          </Text>
          <Text className="text-red-500 text-center mb-6">{error}</Text>
          <Button onPress={fetchLoans} className="bg-red-500">
            <Text className="text-white font-medium">ลองอีกครั้ง</Text>
          </Button>
        </View>
      </View>
    );
  }

  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof amountMemoSchema>>({
    resolver: zodResolver(amountMemoSchema),
  });

  const navigation = useNavigation();
  const [tagValue, setTagValue] = React.useState<string[]>([]); // Store selected tags
  const [statusValue, setStatusValue] = React.useState<string[]>([]); // Store selected statuses
  const [isGridView, setIsGridView] = useState(false); // Toggle between GridView and ListView
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [toggleValue, setToggleValue] = useState("all"); // Filter toggle
  const [isGradientVisible, setGradientVisible] = useState(true); // Gradient control
  const [isSearchbarSticky, setSearchbarSticky] = useState(false); // Sticky search bar control
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [visibleLoans, setVisibleLoans] = useState<Loan[]>([]); // Visible loans after filtering
  const scrollViewRef = useRef(null); // ScrollView reference
  const user = useUserStore();
  const { tags, addTag, clearTags, removeTag } = useFilterStore();

  function goToCreateDebtorCSV() {
    router.push("/debtor/create-csv");
  }

  // console.log(user); // Commented out to prevent console spam

  const openDrawerAndClearTags = () => {
    setDrawerOpen(true);
  };

  // First, limit loans to the number of `user.limit` and update visible loans
  useEffect(() => {
    try {
      if (!loans || !Array.isArray(loans)) {
        setVisibleLoans([]);
        return;
      }

      if (toggleValue === "filter") {
        const filtered = loans
          .slice(0, user.debtorSlotAvailable || loans.length)
          .filter((loan) => {
            if (!loan) return false;
            const matchesStatus =
              tags.length === 0 || tags.includes(statusAlias[loan.loanStatus]);
            return matchesStatus;
          })
          .filter((loan) => {
            if (!loan) return false;
            const matchesTag =
              tags.length <= 1 || loan.tags?.some((tag) => tags.includes(tag));
            return matchesTag;
          });

        setVisibleLoans(filtered);
      } else if (toggleValue === "all" || toggleValue === "old") {
        const filtered = loans
          .slice(0, user.debtorSlotAvailable || loans.length)
          .filter((loan) => {
            if (!loan) return false;
            if (toggleValue === "all") return true;
            if (toggleValue === "old") return loan.loanStatus === "CLOSED";
            return false;
          });
        setVisibleLoans(filtered);
      }
    } catch (error) {
      console.error("Error filtering visible loans:", error);
      setVisibleLoans([]);
    }
  }, [toggleValue, loans, tags, user.debtorSlotAvailable]); // Add `user.debtorSlotAvailable` dependency

  // Handle Confirm Button (ตกลง) to add tags and statuses to store and reset state
  const handleConfirm = () => {
    clearTags();
    tagValue.forEach((tag) => addTag(tag));
    statusValue.forEach((status) => addTag(status));

    setDrawerOpen(false);
    setTagValue([]);
    setStatusValue([]);
  };

  // Additional search query filtering
  const filteredData = visibleLoans.filter((item) => {
    try {
      if (!item) return false;

      const searchLower = searchQuery.toLowerCase();
      return (
        item.id?.toLowerCase().includes(searchLower) ||
        item.nickname?.toLowerCase().includes(searchLower) ||
        `${item.firstName || ""} ${item.lastName || ""}`
          .toLowerCase()
          .includes(searchLower)
      );
    } catch (error) {
      console.error("Error filtering loan item:", error, item);
      return false;
    }
  });

  // Handle scrolling for gradient and sticky search bar
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 55) {
      setGradientVisible(false);
      setSearchbarSticky(true);
    } else {
      setGradientVisible(true);
      setSearchbarSticky(false);
    }
  };

  // Toggle between GridView and ListView
  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  const memoSheetRef = useRef<BottomSheetModal>(null);
  const guarantorSheetRef = useRef<BottomSheetModal>(null);
  const debtorInfoModalRef = useRef<BottomSheetModal>(null);

  const handlePresentMemo = useCallback(() => {
    memoSheetRef.current?.present();
  }, []);

  const handlePresentGuarantor = useCallback(() => {
    guarantorSheetRef.current?.present();
  }, []);

  const handlePresentDebtorInfo = useCallback(() => {
    debtorInfoModalRef.current?.present();
  }, []);

  return (
    <DebtorErrorBoundary onRefresh={fetchLoans}>
      <BottomSheetModalProvider>
        <Drawer
          open={isDrawerOpen}
          onOpen={openDrawerAndClearTags}
          onClose={() => setDrawerOpen(false)}
          drawerPosition="right"
          renderDrawerContent={() => (
            <FilterDrawerContent
              setDrawerOpen={setDrawerOpen}
              tagValue={tagValue}
              setTagValue={setTagValue}
              statusValue={statusValue}
              setStatusValue={setStatusValue}
              handleConfirm={handleConfirm}
            />
          )}
        >
          <View className="flex-1 flex flex-col">
            <MemoSheet ref={memoSheetRef} />
            <GuarantorSheet ref={guarantorSheetRef} />
            <DebtorModal ref={debtorInfoModalRef} />
            {/* Linear Gradient Background */}
            <LinearGradient
              colors={
                isGradientVisible
                  ? ["#F3D791", "#DF9C59", "#FD954B"]
                  : ["#FFFFFF", "#FFFFFF", "#FFFFFF"] // Change to bg-background when scrolled
              }
              start={{ x: 1, y: -0.4 }}
              end={{ x: 0, y: 0.5 }}
              style={styles.gradientBackground}
            />

            <SafeAreaView className="relative">
              <View
                className={cn(CONTAINER, "justify-between flex flex-row pt-2")}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push("/(screen)/profile-setting" as any)
                  }
                >
                  <AvatarText
                    url={user?.profileImage as string}
                    title="สวัสดี"
                    textClassName="text-gray-200"
                  >
                    <Text
                      className={cn(
                        PARAGRAPH_BOLD,
                        "text-lg translate-y-[-6px] text-white"
                      )}
                    >
                      {user?.storeName || "ร้านค้า"}
                    </Text>
                  </AvatarText>
                </TouchableOpacity>
                <View className="flex flex-row gap-2">
                  {/* #TODO: check user role */}
                  {user?.rolePackage !== "" && (
                    <Button
                      variant={"outline_white"}
                      size={"premium"}
                      onPress={goToCreateDebtorCSV}
                    >
                      <View className="flex flex-row gap-2">
                        <Icon name="Users" color="white" size={24} />
                        <Icon name="Plus" color="white" size={24} />
                      </View>
                    </Button>
                  )}
                  <IconButton
                    disabled={(user?.debtorSlotAvailable || 0) < loans.length}
                    onPress={() => router.push("/debtor/create")}
                    className="bg-white"
                    textColor="#E59551"
                    icon={<Plus />}
                    text="เพิ่มลูกหนี้"
                    fontWeight="normal"
                  />
                </View>
              </View>

              <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{
                  flexGrow: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <View
                  className={cn(
                    CONTAINER,
                    "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-5 min-h-[60vh]"
                  )}
                >
                  <Searchbar
                    toggleView={toggleView}
                    isGridView={isGridView}
                    onSearch={setSearchQuery}
                    value={searchQuery}
                    toggleValue={toggleValue}
                    onToggleChange={(value: string) => {
                      if (value === "filter") {
                        setDrawerOpen(true);
                      }
                      setToggleValue(value);
                    }}
                  />

                  {loans.length > (user?.debtorSlotAvailable || 0) && (
                    <View className="bg-[#A35D2B]/10 justify-between flex flex-row rounded-2xl py-3 items-center px-5 mb-3">
                      <Text className={cn(PARAGRAPH_BOLD, "")}>
                        ลูกหนี้เต็มสำหรับแพ็คเกจคุณ
                      </Text>
                      <Button className="rounded-full">
                        <Text className={cn(LABEL, "items-center")}>
                          ดูแพ็คเกจ
                        </Text>
                      </Button>
                    </View>
                  )}

                  {/* Content Section (Grid/List based on toggle) */}
                  <View className="mt-1">
                    {loans.length > 0 ? (
                      isGridView ? (
                        <GridComponent
                          loans={filteredData}
                          onMemo={handlePresentMemo}
                          onGuarantor={handlePresentGuarantor}
                        />
                      ) : (
                        filteredData
                          .map((loan) => {
                            try {
                              return (
                                <LoanCard
                                  key={loan.id}
                                  loan={loan}
                                  onMemo={handlePresentMemo}
                                  onGuarantor={handlePresentGuarantor}
                                  onInfo={handlePresentDebtorInfo}
                                />
                              );
                            } catch (error) {
                              console.error(
                                "Error rendering LoanCard:",
                                error,
                                loan
                              );
                              return null;
                            }
                          })
                          .filter(Boolean)
                      )
                    ) : (
                      <View className="items-center justify-center gap-4 py-40">
                        <Button
                          size="icon-lg"
                          variant="outline"
                          className="w-20 h-20 border-dashed border-gray-300 border-2"
                          onPress={() => router.push("/debtor/create")}
                        >
                          <Plus width={30} height={30} color="gray" />
                        </Button>
                        <Text className={cn(PARAGRAPH_BOLD, " text-gray-500")}>
                          เพิ่มลูกหนี้คนแรกเลย!
                        </Text>
                      </View>
                    )}
                  </View>

                  {loans.length > 0 && (
                    <View className="flex flex-col justify-center items-center">
                      <View className="items-center justify-center rounded-3xl bg-green-100 py-4 mt-3 px-4">
                        <Text className={cn(PARAGRAPH, "text-green-800")}>
                          จำนวนลูกหนี้ {loans.length} /{" "}
                          {user?.debtorSlotAvailable || 0}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </ScrollView>

              {/* Conditionally Sticky Searchbar */}
              {isSearchbarSticky && (
                <Animated.View
                  className={cn(
                    CONTAINER,
                    `${
                      isSearchbarSticky
                        ? "absolute inset-x-0 top-[calc(env(safe-area-inset-top))] bg-background z-10"
                        : "relative"
                    }px-2 py-4`
                  )}
                >
                  <Searchbar
                    toggleView={toggleView}
                    isGridView={isGridView}
                    onSearch={setSearchQuery}
                    value={searchQuery}
                    toggleValue={toggleValue}
                    onToggleChange={(value: string) => {
                      if (value === "filter") {
                        setDrawerOpen(true);
                      }
                      setToggleValue(value);
                    }}
                  />
                </Animated.View>
              )}
            </SafeAreaView>
          </View>
        </Drawer>
      </BottomSheetModalProvider>
    </DebtorErrorBoundary>
  );
};

export default Index;

const styles = StyleSheet.create({
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: 450,
  },
});
