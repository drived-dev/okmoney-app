// App.jsx
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text } from "react-native";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CircleCheckBig, CircleAlert } from "lucide-react-native";
import color from "tailwindcss/colors";
export const toastConfig = {
  success: (props) => (
    <View className="flex flex-row gap-4 w-[90%] bg-background shadow-sm rounded-2xl p-4 items-center opacity-90">
      <CircleCheckBig color={color.green[600]}></CircleCheckBig>
      <View className="flex gap-[-4px] flex-col">
        {props.text1 && (
          <Text className={cn(PARAGRAPH_BOLD)}>{props.text1}</Text>
        )}
        <Text className={cn(LABEL, "text-gray-500")}>{props.text2}</Text>
      </View>
    </View>
  ),
  error: (props) => (
    <View className="flex flex-row gap-4 w-[90%] bg-muted shadow-sm rounded-2xl p-4 items-center">
      <CircleAlert color={color.red[600]}></CircleAlert>
      <View className="flex gap-[-4px] flex-col">
        {props.text1 && (
          <Text className={cn(PARAGRAPH_BOLD)}>{props.text1}</Text>
        )}
        <Text className={cn(LABEL, "text-gray-500")}>{props.text2}</Text>
      </View>
    </View>
  ),
};
