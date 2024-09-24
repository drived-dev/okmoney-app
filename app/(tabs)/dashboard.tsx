import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import PhoneInput from "~/components/phone-input";

import ProgressText from "~/components/progress-text";
import { CONTAINER } from "~/constants/Styles";
const DashboardPage = () => {
  return (
    <SafeAreaView>
      <View className={CONTAINER}>
        <PhoneInput />
      </View>
    </SafeAreaView>
  );
};

export default DashboardPage;
