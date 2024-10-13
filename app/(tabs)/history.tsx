import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { TITLE } from "~/constants/Typography";
import { Historylist } from "~/components/history/history-list";

const history = () => {
  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "mt-4")}>
        <Text className={cn(TITLE, "")}>ประวัติการชำระ</Text>

        <Historylist
          url="https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
          nickname="ธาม"
          name="สมพง นักบิด"
          variant="payment"
          slip="https://example.com/slip.png"
          value="1500"
        />
      </View>
    </SafeAreaView>
  );
};

export default history;
