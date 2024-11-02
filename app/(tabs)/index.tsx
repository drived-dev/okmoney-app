import { Link, router, useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text } from "~/components/ui/text";
import { PARAGRAPH } from "~/constants/Typography";
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
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/icon";
import { PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { Drawer } from "react-native-drawer-layout";

const Index = () => {
  const [isGridView, setIsGridView] = useState(false); // Toggle between GridView and ListView
  const [searchQuery, setSearchQuery] = useState(""); // Search state, shared by both search bars
  const [toggleValue, setToggleValue] = useState("all"); // Filter toggle status, shared by both search bars
  const [isGradientVisible, setGradientVisible] = useState(true); // Gradient control
  const [isSearchbarSticky, setSearchbarSticky] = useState(false); // Sticky search bar control

  const scrollViewRef = useRef(null); // ScrollView reference
  const loans = useLoanStore((state) => state.loans);
  const navigation = useNavigation();

  const loandata = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 3,
  };

  const demodata = loans; // Assuming loans come from the store

  // Filtered data based on the search query and toggle filter
  const filteredData = demodata.filter(
    (item) =>
      (toggleValue === "all" ||
        (toggleValue === "old" && item.tags?.includes("old"))) && // Apply toggle filter
      (item.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nickname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      <SafeAreaView className="">
        {/* ScrollView to handle scrolling */}
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 150 }} // Ensure proper padding at the bottom
        >
          {/* Avatar and Add Button */}
          <View className={cn(CONTAINER, "justify-between flex flex-row")}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <AvatarText
                url="https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
                title="test"
              >
                <Text className={cn(PARAGRAPH, "text-primary")}>
                  {loandata.nickname}
                </Text>
              </AvatarText>
            </TouchableOpacity>
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

          {/* Searchbar and Theme Toggle */}
          <View
            className={cn(
              CONTAINER,
              "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-5"
            )}
          >
            <Searchbar
              toggleView={toggleView}
              isGridView={isGridView}
              onSearch={setSearchQuery} // Sync the search query with the parent
              value={searchQuery} // Pass the search query to keep it synchronized
              toggleValue={toggleValue} // Sync the toggle filter value
              onToggleChange={setToggleValue} // Sync the toggle filter handler
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

        {/* Conditionally Sticky Searchbar */}
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
              onSearch={setSearchQuery} // Sync the search query with the parent
              value={searchQuery} // Pass the search query to keep it synchronized
              toggleValue={toggleValue} // Sync the toggle filter value
              onToggleChange={setToggleValue} // Sync the toggle filter handler
            />
          </Animated.View>
        )}
      </SafeAreaView>
    </View>
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
