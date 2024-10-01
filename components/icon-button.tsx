import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "~/lib/utils";
import { PARAGRAPH_BOLD } from "~/constants/Typography";
import colors from "tailwindcss/colors";

interface IconButton extends ButtonProps {
  icon: JSX.Element;
  text: string;
  variant?: keyof typeof IconButtonColor;
  iconPosition?: "left" | "right";
}

const IconButtonColor = {
  ghost: colors.gray[800],
  default: colors.white,
  outline: colors.gray[500],
};

const IconButton = ({
  icon,
  text,
  variant = "default",
  iconPosition = "left",
  ...props
}: IconButton) => {
  const currentColor = IconButtonColor[variant];

  const modifiedIcon = React.cloneElement(icon, {
    color: currentColor,
  });

  return (
    <Button
      variant={variant}
      className={cn(
        "relative  justify-center",
        iconPosition === "right" ? "flex-row-reverse" : "flex-row"
      )}
      {...props}
    >
      <View className="left-0">{modifiedIcon}</View>
      <Text
        className={cn(PARAGRAPH_BOLD, "flex-1 text-center")}
        style={{ color: currentColor }}
      >
        {text}
      </Text>
    </Button>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
