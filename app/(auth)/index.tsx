import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "~/lib/utils";
import { SUBHEADER, TITLE } from "~/constants/Typography";
import { IconButton } from "~/components/icon-button";
import { ArrowRight } from "lucide-react-native";
import { CONTAINER } from "~/constants/Styles";
import { useRouter } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

const index = () => {
  const router = useRouter();
  return (
    <View className="h-full">
      <SafeAreaView>
        {/* <ThemeToggle /> */}
        <View className="justify-center items-center mt-40">
          <View className="flex flex-col gap-8 items-center justify-center">
            <Image
              source={require("assets/images/icon.png")}
              className="w-24 h-24 border border-gray-400 rounded-lg"
            />
            <View className="flex flex-col gap-2 items-center">
              <Text className={cn(SUBHEADER, "text-foreground")}>
                OK moneys
              </Text>
              <Text className={cn(TITLE, "text-foreground")}>
                ระบบจัดการลูกหนี้
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      {/* next Button */}
      <View className={cn(CONTAINER, "absolute bottom-20 px-10")}>
        <IconButton
          icon={<ArrowRight />}
          size={"xl"}
          text="เริ่มเลย"
          iconPosition="right"
          className="px-40 justify-center items-center"
          onPress={() => router.navigate("/(auth)/login")}
        ></IconButton>
      </View>
    </View>
  );
};

export default index;
