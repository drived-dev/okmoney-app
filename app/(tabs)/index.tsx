import { Link, router, useNavigation } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Animated } from "react-native";
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
import { Plus } from "lucide-react-native";
import { GridComponent } from "~/components/main/grid-card";
import useLoanStore from "~/store/use-loan-store";
import useFilterStore from "~/store/use-filter-store";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/icon";
import { Drawer } from "react-native-drawer-layout";
import {
  ToggleGroup,
  ToggleGroupIcon,
  ToggleGroupItem,
} from "~/components/ui/toggle-group";

const Index = () => {
  const [tagValue, settagValue] = React.useState<string[]>([]); // Store selected tags
  const [statusValue, setstatusValue] = React.useState<string[]>([]); // Store selected statuses
  const [isGridView, setIsGridView] = useState(false); // Toggle between GridView and ListView
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [toggleValue, setToggleValue] = useState("all"); // Filter toggle
  const [isGradientVisible, setGradientVisible] = useState(true); // Gradient control
  const [isSearchbarSticky, setSearchbarSticky] = useState(false); // Sticky search bar control
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [visibleLoans, setVisibleLoans] = useState([]); // Visible loans after filtering

  const scrollViewRef = useRef(null); // ScrollView reference
  const { loans } = useLoanStore(); // Retrieve loans from useLoanStore
  const { tags, addTag, clearTags } = useFilterStore(); // Retrieve selected tags from useTagStore

  const loandata = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 4, // Limit for loan display
  };

  const openDrawerAndClearTags = () => {
    setDrawerOpen(true);
  };

  // useEffect(() => {
  //   if (toggleValue !== "filter") {
  //     clearTags();
  //   }
  // }, [toggleValue]);

  // First, limit loans to the number of `loandata.limit` and update visible loans
  useEffect(() => {
    const limitedLoans = loans.slice(0, loandata.limit); // Limit loans to the number of loandata.limit
    setVisibleLoans(limitedLoans);
  }, [loans]); // This runs only when loans are retrieved

  // Handle Confirm Button (ตกลง) for "filter" mode
  const handleConfirm = () => {
    clearTags();
    // Add selected tagValue to the store
    if (Array.isArray(tagValue) && tagValue.length > 0) {
      tagValue.forEach((tag) => addTag(tag));
    }

    // Add selected statusValue to the store
    if (Array.isArray(statusValue) && statusValue.length > 0) {
      statusValue.forEach((status) => addTag(status));

      console.log(tags);
    }

    // If toggleValue is "filter", apply tag and status filtering
    if (toggleValue === "filter") {
      const filtered = loans
        .slice(0, loandata.limit) // Apply the limit first
        .filter((loan) => {
          const matchesTag =
            tags.length === 0 ||
            (loan.tags?.some((tag) => tags.includes(tag)) &&
              tags.length === 0) ||
            loan.tags?.some((status) => tags.includes(status));

          return matchesTag; // We can add status filtering as well if needed
        });
      setVisibleLoans(filtered);
    }

    // Close the drawer
    setDrawerOpen(false);
  };

  // **Filtering logic when toggleValue is "all" or "old"**
  useEffect(() => {
    if (toggleValue === "all" || toggleValue === "old") {
      const filtered = loans
        .slice(0, loandata.limit) // Apply the limit first
        .filter((loan) => {
          if (toggleValue === "all") return true; // If "all", show everything within the limit
          if (toggleValue === "old") return loan.tags?.includes("old"); // If "old", filter by tag "old"
        });
      setVisibleLoans(filtered);
    }
  }, [toggleValue, loans]);

  // Additional search query filtering
  const filteredData = visibleLoans.filter(
    (item) =>
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle scrolling for gradient and sticky search bar
  const handleScroll = (event) => {
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

  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={openDrawerAndClearTags}
      onClose={() => setDrawerOpen(false)}
      drawerPosition="right"
      renderDrawerContent={() => (
        <View className={cn(CONTAINER, "bg-background h-full")}>
          <SafeAreaView>
            <View className="flex flex-col gap-4">
              <Text className={cn(PARAGRAPH, "")}>ค้นหาด้วยฟิวเตอร์</Text>
              <View className="h-px bg-gray-400" />
              <View>
                <View className="flex flex-col gap-2">
                  <View className="flex flex-row gap-1 items-center">
                    <Icon name="Tag" size={16} />
                    <Text className={cn(LABEL, "")}>แท็ก</Text>
                  </View>
                  <View>
                    <ToggleGroup
                      value={tagValue}
                      onValueChange={(value) =>
                        settagValue(value ? [value] : [])
                      }
                      type="single"
                      className="flex flex-col gap-2"
                    >
                      <ToggleGroupItem
                        value="friend"
                        aria-label="Toggle all"
                        className="w-full"
                      >
                        <Text
                          className={cn(
                            PARAGRAPH,
                            "pt-2 font-ibm text-base leading-6 text-foreground"
                          )}
                        >
                          เพื่อน
                        </Text>
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="family"
                        aria-label="Toggle old"
                        className="w-full"
                      >
                        <Text
                          className={cn(
                            PARAGRAPH,
                            "pt-2 font-ibm text-base leading-6 text-foreground"
                          )}
                        >
                          ครอบครัว
                        </Text>
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </View>
                </View>
              </View>
              <View className="h-px bg-gray-400" />
              <View className="flex flex-col gap-2">
                <View className="flex flex-row gap-1 items-center">
                  <Icon name="CircleCheckBig" size={16} />
                  <Text className={cn(LABEL, "")}>สถานะ</Text>
                </View>
                <View>
                  <ToggleGroup
                    value={statusValue}
                    onValueChange={(value) =>
                      setstatusValue(value ? [value] : [])
                    }
                    type="single"
                    className="flex flex-col gap-2"
                  >
                    <ToggleGroupItem
                      value="overdue"
                      aria-label="Toggle all"
                      className="w-full"
                    >
                      <Text
                        className={cn(
                          PARAGRAPH,
                          "pt-2 font-ibm text-base leading-6 text-foreground"
                        )}
                      >
                        ค้างชำระ
                      </Text>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="nearly"
                      aria-label="Toggle old"
                      className="w-full"
                    >
                      <Text
                        className={cn(
                          PARAGRAPH,
                          "pt-2 font-ibm text-base leading-6 text-foreground"
                        )}
                      >
                        ใกล้กำหนด
                      </Text>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="waiting"
                      aria-label="Toggle old"
                      className="w-full"
                    >
                      <Text
                        className={cn(
                          PARAGRAPH,
                          "pt-2 font-ibm text-base leading-6 text-foreground"
                        )}
                      >
                        รอชำระ
                      </Text>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <View className={cn(CONTAINER, "mt-auto px-4 w-full")}>
            <View className="flex flex-row gap-2 ">
              <Button
                variant="outline"
                size={"xl"}
                onPress={() => setDrawerOpen(false)}
              >
                <Text className={cn(PARAGRAPH_BOLD, "items-center")}>
                  ยกเลิก
                </Text>
              </Button>
              <Button variant="destructive" size={"xl"} onPress={handleConfirm}>
                <Text className={cn(PARAGRAPH_BOLD, "items-center")}>ตกลง</Text>
              </Button>
            </View>
          </View>
        </View>
      )}
    >
      <View className="flex-1">
        <LinearGradient
          colors={
            isGradientVisible
              ? ["#F3D791", "#DF9C59", "#FD954B"]
              : ["#FFFFFF", "#FFFFFF", "#FFFFFF"]
          }
          start={{ x: 1, y: -0.4 }}
          end={{ x: 0, y: 0.5 }}
          style={styles.gradientBackground}
        />

        <SafeAreaView>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            <View className={cn(CONTAINER, "justify-between flex flex-row")}>
              <AvatarText url={loandata.profileImage} title="test">
                <Text className={cn(PARAGRAPH, "text-primary")}>
                  {loandata.nickname}
                </Text>
              </AvatarText>
              <View className="flex flex-row gap-2">
                {loandata.status !== 0 && (
                  <Button variant={"outline_white"} size={"premium"}>
                    <View className="flex flex-row gap-2">
                      <Icon name="Users" color="white" size={24} />
                      <Icon name="Plus" color="white" size={24} />
                    </View>
                  </Button>
                )}
                <IconButton
                  onPress={() => router.push("/debtor/create")}
                  className="bg-white"
                  textColor="#E59551"
                  icon={<Plus />}
                  text="เพิ่มลูกหนี้"
                  fontWeight="normal"
                />
              </View>
            </View>

            <View
              className={cn(
                CONTAINER,
                "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-5"
              )}
            >
              <Searchbar
                toggleView={toggleView}
                isGridView={isGridView}
                onSearch={setSearchQuery}
                value={searchQuery}
                toggleValue={toggleValue}
                onToggleChange={(value) => {
                  if (value === "filter") {
                    setDrawerOpen(true);
                  }
                  setToggleValue(value);
                }}
              />

              {filteredData.length > loandata.limit && (
                <View className="bg-[#A35D2B]/10 justify-between flex flex-row rounded-2xl py-3 items-center px-5 mb-3">
                  <Text className={cn(PARAGRAPH_BOLD, "")}>
                    ลูกหนี้เต็มสำหรับแพ็คเกจคุณ
                  </Text>
                  <Button className="rounded-full">
                    <Text className={cn(LABEL, "items-center")}>ดูแพ็คเกจ</Text>
                  </Button>
                </View>
              )}

              <View className="mt-1">
                {loans.length > 0 ? (
                  isGridView ? (
                    <GridComponent data={filteredData} />
                  ) : (
                    filteredData.map((loan) => (
                      <LoanCard key={loan.id} loan={loan} />
                    ))
                  )
                ) : (
                  <Text>No Loans Available</Text>
                )}
              </View>
              <View>
                <Button onPress={() => console.log(tagValue)}>
                  <Text className={cn(PARAGRAPH, "text-background")}>
                    Debug
                  </Text>
                </Button>
              </View>
            </View>
          </ScrollView>

          {isSearchbarSticky && (
            <Animated.View
              className={cn(
                CONTAINER,
                "absolute top-16 left-0 right-0 bg-background z-10 px-2 py-4"
              )}
            >
              <Searchbar
                toggleView={toggleView}
                isGridView={isGridView}
                onSearch={setSearchQuery}
                value={searchQuery}
                toggleValue={toggleValue}
                onToggleChange={setToggleValue}
              />
            </Animated.View>
          )}
        </SafeAreaView>
      </View>
    </Drawer>
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
    height: 200,
  },
});
