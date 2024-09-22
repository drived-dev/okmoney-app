import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Progress } from "~/components/ui/progress";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import { LABEL } from "~/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
interface ProgressTextProps
  extends React.ComponentPropsWithoutRef<typeof View> {
  textStart: string;
  textEnd?: string;
  /** "percentage" must be an interger between 0-100 **/
  percentage: number;
  fontWidth?: number;
  leftPadding?: number;
  /** "gradientColors" uses colors from expo-linear-gradient as base **/
  gradientColors?: string[];
}

export type LayoutEvent = {
  nativeEvent: {
    layout: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
};

const ProgressText = ({
  className = "",
  textStart = "",
  textEnd = "",
  percentage = 0,
  fontWidth = 9,
  leftPadding = 10,
  gradientColors = ["rgba(255, 132, 38, 0.8)", "rgba(232, 93, 13, 0.8)"],
  ...props
}: ProgressTextProps) => {
  if (percentage < 0 || percentage > 100)
    throw new Error("percentage must be an interger between 0-100");

  const [width, setWidth] = React.useState(0);

  function handleWidth() {
    const offsetWeight = 1;
    const additionalOffset =
      percentage - 90 > 0 ? (percentage - 90) * offsetWeight : 0;
    const minWidth = textStart.length * fontWidth + leftPadding;
    const maxWidthMinusEnd = width - textEnd.length * fontWidth;

    if (percentage == 100) return width;

    const percentageWitdh = width * (percentage / 100);

    if (percentageWitdh < minWidth) {
      return minWidth;
    } else if (percentageWitdh > maxWidthMinusEnd) {
      return maxWidthMinusEnd + additionalOffset;
    } else {
      return percentageWitdh;
    }
  }

  function getWidth(event: LayoutEvent) {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  }

  return (
    <View className={cn(className)} {...props}>
      <View
        className="relative border-gray-400 border-hairline rounded-lg min-w-20"
        onLayout={getWidth}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 28,
            borderRadius: 8,
            width: handleWidth(),
          }}
        >
          <Text
            numberOfLines={1}
            className={cn(
              LABEL,
              "text-white absolute bottom-1/2 translate-y-1/2 right-2"
            )}
          >
            {textStart}
          </Text>
        </LinearGradient>
      </View>
      {percentage != 100 && (
        <Text
          numberOfLines={1}
          className={cn(
            LABEL,
            "text-gray-400 absolute bottom-1/2 translate-y-1/2 right-2"
          )}
        >
          {textEnd}
        </Text>
      )}
    </View>
  );
};

export default ProgressText;
