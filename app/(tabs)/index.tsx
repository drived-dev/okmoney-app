import { Link, router, useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { LoanCard } from "~/components/main/loan-card";
import { Searchbar } from "~/components/main/search_bar";
import { AvatarText } from "~/components/avatar-text";
import { IconButton } from "~/components/icon-button";
import { Plus } from "lucide-react-native";
import { GridComponent } from "~/components/main/grid-card";
import { Icon } from "~/components/icon";
import { useRouter } from "expo-router";
import useLoanStore from "~/store/use-loan-store";

const screenWidth = Dimensions.get("window").width;

const Index = () => {
  const navigation = useNavigation();
  const [isGridView, setIsGridView] = useState(false); // State for toggling between FlatList and GridView
  const flatListRef = useRef(null); // FlatList reference
  const scrollViewRef = useRef(null); // ScrollView reference for Grid

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const creditorData = {
    nickname: "บิ้ง",
    status: 1,
    profileImage:
      "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg",
    limit: 14,
  };

  const loans = useLoanStore((state) => state.loans);
  const [isGradientVisible, setGradientVisible] = useState(true); // State to control background color
  const [isSearchbarSticky, setSearchbarSticky] = useState(false); // State to control sticky searchbar

  function goToDebtorCreate() {
    router.push("/debtor/create");
  }

  const [phoneValue, setPhoneValue] = useState("");
  const [toggleValue, setToggleValue] = useState("all");

  const handlePhoneChange = (value) => {
    setPhoneValue(value); // Sync phone input across both Searchbars
  };

  // Handler to track scroll position
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;

    // Control gradient visibility
    if (scrollPosition > 55) {
      setGradientVisible(false);
      setSearchbarSticky(true); // Make Searchbar sticky when the gradient changes
    } else {
      setGradientVisible(true);
      setSearchbarSticky(false); // Reset Searchbar to normal
    }
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
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
          {/* Avatar and Add Button */}
          <View className={cn(CONTAINER, "justify-between flex flex-row")}>
            <AvatarText
              url={
                "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
              }
              title="test"
            >
              <Text className={cn(PARAGRAPH, "text-primary")}>FOBO01</Text>
            </AvatarText>

            <IconButton
              onPress={goToDebtorCreate}
              className="bg-white"
              textColor="#E59551"
              icon={<Plus />}
              text="เพิ่มลูกหนี้"
              fontWeight="normal"
            />
          </View>

          {/* Loan List Content */}
          <View
            className={cn(CONTAINER, "mt-4 bg-background rounded-3xl pt-5")}
          >
            {/* <Searchbar /> */}
            {/* <ThemeToggle /> */}

            <View className="mt-4">
              {loans.length > 0 ? (
                loans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
              ) : (
                <Text>No Loans Available</Text>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Conditionally Sticky Searchbar */}
        <Animated.View
          className={cn(
            CONTAINER,
            `${
              isSearchbarSticky
                ? "absolute top-16 left-0 right-0 bg-background z-10"
                : "relative"
            }px-2 py-4`
          )}
          // style={[
          //   styles.searchbar,
          //   isSearchbarSticky ? styles.stickySearchbar : null, // Conditionally apply sticky style
          // ]}
        >
          {/* <Searchbar
            phoneValue={phoneValue}
            onPhoneChange={handlePhoneChange}
            toggleValue={toggleValue}
            onToggleChange={handleToggleChange}
          /> */}
        </Animated.View>
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
  searchbar: {
    position: "relative", // Normal position when not sticky
    zIndex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  stickySearchbar: {
    position: "absolute", // Stick it to the top when active
    top: 60, // Position it just below the avatar section
    left: 0,
    right: 0,
    backgroundColor: "#fff", // Keep background to stand out
    zIndex: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
