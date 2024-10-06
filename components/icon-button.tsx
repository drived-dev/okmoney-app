import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from "react-native";
import React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PARAGRAPH_BOLD } from "~/constants/Typography";
import colors from "tailwindcss/colors";
interface IconButton extends ButtonProps {
  icon: JSX.Element;
  text?: string;
  textColor?: string;
  variant?: keyof typeof IconButtonColor;
  iconPosition?: "left" | "right";
}

const IconButtonColor = {
  ghost: colors.gray[800],
  default: colors.white,
  outline: colors.gray[500],
  secondary: colors.orange,
  green: colors.black,
};

export const IconButton = ({
  icon,
  text,
  textColor = "",
  variant = "default",
  iconPosition = "left",
  ...props
}: IconButton) => {
  const currentColor = textColor
    ? textColor
    : IconButtonColor[variant]?.toString();

  const modifiedIcon = React.cloneElement(icon, {
    color: currentColor,
  });

  return (
    <Button variant={variant} {...props}>
      <View className={cn("justify-center items-center flex flex-row gap-2")}>
        <View>{modifiedIcon}</View>
        <Text
          className={cn(PARAGRAPH_BOLD, "min-w-auto text-center")}
          style={{ color: currentColor }}
        >
          {text}
        </Text>
      </View>
    </Button>
  );
};
