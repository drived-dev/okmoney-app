import { Link, useNavigation } from "expo-router";
import React, { useState, useRef } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
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
  function goToDebtorCreate() {
    router.push("/debtor/create");
  }

  const visibleData =
    loans.length > creditorData.limit
      ? loans.slice(0, creditorData.limit)
      : loans;

  const router = useRouter();
  return (
    <View className="flex-1">
      {/* Linear Gradient Background */}
      <LinearGradient
        colors={["#F3D791", "#DF9C59", "#FD954B"]}
        start={{ x: 1, y: -0.4 }}
        end={{ x: 0, y: 0.5 }}
        style={styles.gradientBackground}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <View className={cn(CONTAINER, "justify-between flex flex-row")}>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <AvatarText url={creditorData.profileImage} title="test">
              <Text className={cn(PARAGRAPH, "text-primary")}>
                {creditorData.nickname}
              </Text>
            </AvatarText>
          </TouchableOpacity>
          <View className="flex flex-row gap-2">
            {creditorData.status !== 0 && (
              <Button
                variant={"outline_white"}
                size={"premium"}
                onPress={() => router.push("/avatar")}
              >
                <View className="flex flex-row gap-2">
                  <Icon name="Users" color="white" size={24} />
                  <Icon name="Plus" color="white" size={24} />
                </View>
              </Button>
            )}

            {/* Add debtor button */}
            <IconButton
              onPress={goToDebtorCreate}
              className="bg-white"
              textColor="#E59551"
              icon={<Plus />}
              text="เพิ่มลูกหนี้"
            />
          </View>
        </View>

        <View
          className={cn(
            CONTAINER,
            "mt-4 bg-background rounded-3xl pt-5 flex flex-col gap-2 flex-1"
          )}
        >
          <View className="flex flex-col gap-5">
            <View>
              <ThemeToggle />
            </View>
            <View>
              <Searchbar toggleView={toggleView} isGridView={isGridView} />
            </View>
          </View>
          <FlatList
            data={loans}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <LoanCard loan={item} />}
            className="mt-4"
          />

          {/* Alert Bar if the number of debtors exceeds the limit */}
          {loans.length > creditorData.limit && (
            <View className="bg-[#A35D2B]/10 justify-between flex flex-row rounded-2xl py-3 items-center px-5 mb-3">
              <Text className={cn(PARAGRAPH_BOLD, "")}>
                ลูกหนี้เต็มสำหรับแพ็คเกจคุณ
              </Text>
              <Button className="rounded-full">
                <Text className={cn(LABEL, "items-center")}>ดูแพ็คเกจ</Text>
              </Button>
            </View>
          )}

          {/* Conditionally Render FlatList or ScrollView */}
          {isGridView ? (
            <View>
              <ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                  paddingBottom: 120,
                }}
                // onScroll={Animated.event(
                //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                //   { useNativeDriver: false }
                // )}
                scrollEventThrottle={16}
              >
                <GridComponent data={visibleData} />
                {/* Footer for grid view */}
                <View className="flex flex-col justify-center items-center">
                  <View className="items-center justify-center rounded-3xl bg-green-100 py-4 px-4">
                    <Text className={cn(PARAGRAPH, "text-green-800")}>
                      จำนวนลูกหนี้ {loans.length} / {creditorData.limit}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          ) : (
            <View>
              <FlatList
                ref={flatListRef}
                data={visibleData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LoanCard loan={item} />}
                contentContainerStyle={{
                  paddingBottom: 200,
                }}
                // onScroll={Animated.event(
                //   [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                //   { useNativeDriver: false }
                // )}
                scrollEventThrottle={16}
                ListFooterComponent={() => (
                  <View className="flex flex-col justify-center items-center">
                    <View className="items-center justify-center rounded-3xl bg-green-100 py-4 mt-3 px-4">
                      <Text className={cn(PARAGRAPH, "text-green-800")}>
                        จำนวนลูกหนี้ {loans.length} / {creditorData.limit}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </View>
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
