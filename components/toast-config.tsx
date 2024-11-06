// App.jsx
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { View, Text } from "react-native";
import { PARAGRAPH, PARAGRAPH_BOLD, LABEL } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CircleCheckBig, CircleAlert, CircleX } from "lucide-react-native";
import color from "tailwindcss/colors";
export const toastConfig = {
  success: (props) => (
    <CustomToast
      title={props.text1}
      message={props.text2}
      icon={<CircleCheckBig color={color.green[600]} />}
    />
  ),
  error: (props) => (
    <CustomToast
      title={props.text1}
      message={props.text2}
      icon={<CircleX color={color.red[600]} />}
    />
  ),
  info: (props) => (
    <CustomToast
      title={props.text1}
      message={props.text2}
      icon={<CircleAlert color={color.black} />}
    />
  ),
};

interface CustomToastProps {
  title?: string;
  message: string;
  icon: JSX.Element;
}

const CustomToast = ({ title, message, icon }: CustomToastProps) => {
  return (
    <View className="flex flex-row gap-4 w-[90%] bg-background shadow-sm rounded-2xl py-2 px-4 items-center opacity-90">
      {icon}
      <View className="flex gap-0 flex-col">
        {title && (
          <Text className={cn(PARAGRAPH_BOLD, "translate-y-[4px]")}>
            {title}
          </Text>
        )}
        <Text className={cn(LABEL, "text-gray-500")}>{message}</Text>
      </View>
    </View>
  );
};
