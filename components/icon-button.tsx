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
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import colors from "tailwindcss/colors";
export interface IconButtonProps extends ButtonProps {
  icon: JSX.Element;
  text?: string;
  textColor?: string;
  variant?: keyof typeof IconButtonColor;
  fontWeight: "bold" | "normal";
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
  fontWeight = "bold",
  className,
  ...props
}: IconButtonProps) => {
  const currentColor = textColor
    ? textColor
    : IconButtonColor[variant]?.toString();

  const modifiedIcon = React.cloneElement(icon, {
    color: currentColor,
  });

  return (
    <Button
      variant={variant}
      className={cn(
        "justify-center items-center flex flex-row gap-2",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    >
      <View>{modifiedIcon}</View>
      <Text
        className={cn(
          fontWeight === "bold" ? PARAGRAPH_BOLD : PARAGRAPH,
          "min-w-auto text-center"
        )}
        style={{ color: currentColor }}
      >
        {text}
      </Text>
    </Button>
  );
};
