import { Image, Text, View } from "react-native";
import React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD } from "~/constants/Typography";
import colors from "tailwindcss/colors";
export interface IconButtonProps extends ButtonProps {
  icon: JSX.Element;
  text?: string;
  textColor?: string;
  textClassName?: string;
  variant?: keyof typeof IconButtonColor;
  fontWeight?: "bold" | "normal";
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
  text = "",
  textColor = "",
  textClassName = "",
  variant = "default",
  iconPosition = "left",
  fontWeight = "bold",
  className,
  ...props
}: IconButtonProps) => {
  const currentColor = textColor
    ? textColor
    : IconButtonColor[variant]?.toString();

  // Determine if the icon is a local image, remote URL, or a JSX icon component
  const renderIcon = (icon: JSX.Element | number | string) => {
    if (typeof icon === "number") {
      // Local image from require()
      return <Image source={icon} style={{ width: 24, height: 24 }} />;
    } else if (typeof icon === "string") {
      // Remote image from URL
      return <Image source={{ uri: icon }} style={{ width: 24, height: 24 }} />;
    } else {
      // JSX element (e.g., Lucide icon), modify its color
      return React.cloneElement(icon, {
        color: currentColor,
      });
    }
  };

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
      <View>{renderIcon(icon)}</View>
      <Text
        className={cn(PARAGRAPH_BOLD, textClassName, "min-w-auto text-center")}
        style={{ color: currentColor }}
      >
        {text}
      </Text>
    </Button>
  );
};
