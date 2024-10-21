import React, { useRef, useState } from "react";
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
import useFilterStore from "~/store/use-filter-store"; // Import the filter store
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/icon";
import { Drawer } from "react-native-drawer-layout";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

const Index = () => {
  const [isGridView, setIsGridView] = useState(false); // Toggle between GridView and ListView
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [toggleValue, setToggleValue] = useState("all"); // Filter toggle status, shared by both search bars
  const [isGradientVisible, setGradientVisible] = useState(true); // Gradient control
  const [isSearchbarSticky, setSearchbarSticky] = useState(false); // Sticky search bar control
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Drawer open/close state

  const scrollViewRef = useRef(null); // ScrollView reference
  const loans = useLoanStore((state) => state.loans); // Fetch loans from the loan store

  // Use filter store to manage tagvalue and statusvalue
  const {
    tagvalue,
    statusvalue,
    addValue, // Make sure addValue is being correctly used
    deleteValue,
    clearValues,
  } = useFilterStore();

  const loandata = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 4,
  };

  const demodata = loans; // Assuming loans come from the store

  // Filtered data based on the search query, selected tags, and status
  const filteredData = demodata.filter((item) => {
    // Apply tag filter if tags are selected
    const tagMatch =
      tagvalue.length === 0 || tagvalue.some((tag) => item.tags.includes(tag));

    // Apply status filter if statuses are selected
    const statusMatch =
      statusvalue.length === 0 || statusvalue.includes(item.status);

    // Apply search filter
    const searchMatch =
      item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase());

    // Return true only if the loan matches all the conditions
    return tagMatch && statusMatch && searchMatch;
  });

  // Visible data is restricted to the limit of the loan data
  const visibleData =
    filteredData.length > loandata.limit
      ? filteredData.slice(0, loandata.limit)
      : filteredData;

  // Handle scrolling to control gradient and sticky search bar
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
      onOpen={() => setDrawerOpen(true)}
      onClose={() => setDrawerOpen(false)}
      drawerPosition="right"
      renderDrawerContent={() => {
        return (
          <View className={cn(CONTAINER, "bg-background h-full ")}>
            <SafeAreaView>
              <View className="flex flex-col gap-4">
                <Text className={cn(PARAGRAPH, "")}>ค้นหาด้วยฟิวเตอร์</Text>
                <View className="h-px bg-gray-400" />
                <View>
                  <View className="flex flex-col gap-2">
                    <View className=" flex flex-row gap-1 items-center">
                      <Icon name="Tag" size={16} />
                      <Text className={cn(LABEL, "")}>แท็ก</Text>
                    </View>
                    <View>
                      <ToggleGroup
                        value={tagvalue}
                        onValueChange={(value) => addValue("tag", [value])} // Add tag
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
                  <View className=" flex flex-row gap-1 items-center">
                    <Icon name="CircleCheckBig" size={16} />
                    <Text className={cn(LABEL, "")}>สถานะ</Text>
                  </View>
                  <View>
                    <ToggleGroup
                      value={statusvalue}
                      onValueChange={(value) => addValue("status", [value])} // Add status
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

              <View className={cn(CONTAINER, "mt-auto px-4 w-full")}>
                <View className="flex flex-row gap-2 ">
                  <Button
                    variant="outline"
                    size={"xl"}
                    onPress={() => setDrawerOpen(false)} // Close the drawer on cancel
                  >
                    <Text className={cn(PARAGRAPH_BOLD, "items-center")}>
                      ยกเลิก
                    </Text>
                  </Button>
                  <Button
                    variant="destructive"
                    size={"xl"}
                    className="flex-1"
                    onPress={() => {
                      // Add the selected tagvalue and statusvalue to the store
                      if (tagvalue.length > 0) {
                        addValue("tag", tagvalue);
                      }
                      if (statusvalue.length > 0) {
                        addValue("status", statusvalue);
                      }
                      setDrawerOpen(false); // Close the drawer
                    }}
                  >
                    <Text className={cn(PARAGRAPH_BOLD, "items-center")}>
                      ตกลง
                    </Text>
                  </Button>
                </View>
              </View>
            </SafeAreaView>
          </View>
        );
      }}
    >
      <View className="flex-1">
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

        <SafeAreaView>
          <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingBottom: 150 }}
          >
            {/* Avatar and Add Button */}
            <View className={cn(CONTAINER, "justify-between flex flex-row")}>
              <AvatarText
                url="https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
                title="test"
              >
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
                    setDrawerOpen(true); // Open drawer on filter toggle
                  }
                  setToggleValue(value);
                }}
              />

              {demodata.length > loandata.limit && (
                <View className="bg-[#A35D2B]/10 justify-between flex flex-row rounded-2xl py-3 items-center px-5 mb-3">
                  <Text className={cn(PARAGRAPH_BOLD, "")}>
                    ลูกหนี้เต็มสำหรับแพ็คเกจคุณ
                  </Text>
                  <Button className="rounded-full">
                    <Text className={cn(LABEL, "items-center")}>ดูแพ็คเกจ</Text>
                  </Button>
                </View>
              )}

              {/* Content Section (Grid/List based on toggle) */}
              <View className="mt-1">
                {loans.length > 0 ? (
                  isGridView ? (
                    <GridComponent data={visibleData} />
                  ) : (
                    visibleData.map((loan) => (
                      <LoanCard key={loan.id} loan={loan} />
                    ))
                  )
                ) : (
                  <Text>No Loans Available</Text>
                )}
              </View>

              <View className="flex flex-col justify-center items-center">
                <View className="items-center justify-center rounded-3xl bg-green-100 py-4 mt-3 px-4">
                  <Text className={cn(PARAGRAPH, "text-green-800")}>
                    จำนวนลูกหนี้ {demodata.length} / {loandata.limit}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {isSearchbarSticky && (
            <Animated.View
              className={cn(
                CONTAINER,
                `${
                  isSearchbarSticky
                    ? "absolute top-16 left-0 right-0 bg-background z-10"
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
