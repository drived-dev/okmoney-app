import { Link, router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { ThemeToggle } from "~/components/ThemeToggle";
import { PARAGRAPH, TITLE, BUTTON } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { CONTAINER } from "~/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { LoanCard } from "~/components/main/loan-card";
import { Searchbar } from "~/components/main/search_bar";
import { Icon } from "~/components/icon";
import { AvatarText } from "~/components/avatar-text";
import { IconButton } from "~/components/icon-button";
import { Plus } from "lucide-react-native";
import useLoanStore from "~/store/use-loan-store";

const Index = () => {
  const loans = useLoanStore((state) => state.loans);
  const [isGradientVisible, setGradientVisible] = useState(true); // State to control background color

  function goToDebtorCreate() {
    router.push("/debtor/create");
  }

  // Handler to track scroll position
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    if (scrollPosition > 60) {
      // Adjust this value based on when you want the color to change
      setGradientVisible(false);
    } else {
      setGradientVisible(true);
    }
  };

  return (
    <View className="">
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
        <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
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

          <View
            className={cn(CONTAINER, "mt-4 bg-background rounded-3xl pt-5")}
          >
            <Searchbar />

            <View className="mt-4">
              {loans.length > 0 ? (
                loans.map((loan) => <LoanCard key={loan.id} loan={loan} />)
              ) : (
                <Text>No Loans Available</Text>
              )}
            </View>
          </View>
        </ScrollView>
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
