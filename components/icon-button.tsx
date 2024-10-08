import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  Image,
} from "react-native";
import React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PARAGRAPH_BOLD } from "~/constants/Typography";
import colors from "tailwindcss/colors";

interface IconButton extends ButtonProps {
  icon: JSX.Element | string; // JSX.Element for an icon or string for a URI
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

  const renderIcon = () => {
    if (typeof icon === "string") {
      // If the icon is a URI, render it using the Image component
      return (
        <Image
          source={{ uri: icon }}
          style={{ width: 24, height: 24, tintColor: currentColor }}
        />
      );
    }
    // Otherwise, assume it's a JSX element and clone it with the current color
    return React.cloneElement(icon, { color: currentColor });
  };

  return (
    <Button variant={variant} {...props}>
      <View className={cn("justify-center items-center flex flex-row gap-2")}>
        {iconPosition === "left" && <View>{renderIcon()}</View>}
        {text && (
          <Text
            className={cn(PARAGRAPH_BOLD, "min-w-auto text-center")}
            style={{ color: currentColor }}
          >
            {text}
          </Text>
        )}
        {iconPosition === "right" && <View>{renderIcon()}</View>}
      </View>
    </Button>
  );
};
