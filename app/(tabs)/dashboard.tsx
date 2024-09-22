import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import ProgressText from "~/components/progress-text";
const DashboardPage = () => {
  return (
    <SafeAreaView>
      <View className="px-5">
        <ProgressText percentage={10} textStart="hello" textEnd="hello" />
      </View>
    </SafeAreaView>
  );
};

export default DashboardPage;
