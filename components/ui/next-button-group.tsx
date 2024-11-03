import { View, Text } from "react-native";
import React from "react";
import { IconButton, IconButtonProps } from "~/components/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { CardFooter } from "./card";
import { router } from "expo-router";
import { Button, ButtonProps } from "./button";
import { cn } from "~/lib/utils";

interface NextButtonGroupProps extends Partial<IconButtonProps> {
  onNext: () => void;
  className?: string;
}

const NextButtonGroup = ({
  onNext,
  className,
  ...props
}: NextButtonGroupProps) => {
  return (
    <View className={cn("flex flex-row gap-2 justify-between", className)}>
      <Button
        onPress={() => {
          router.back();
        }}
        variant="ghost"
        size={"icon-lg"}
      >
        <ArrowLeft color="black" />
      </Button>

      <IconButton
        size={"lg"}
        icon={<ArrowRight />}
        text="ต่อไป"
        variant="default"
        className="items-center"
        iconPosition="right"
        onPress={onNext}
        {...props}
      />
    </View>
  );
};

export default NextButtonGroup;
