import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "./ui/button";
import { LucideX } from "lucide-react-native";

const CloseButton = ({ className }: { className?: string }) => {
  return (
    <Button
      size="icon-lg"
      variant="ghost"
      className={className}
      onPress={() => {
        //TODO: clear form state on back
        router.back();
      }}
    >
      <LucideX color="black" size={24} />
    </Button>
  );
};

const styles = StyleSheet.create({});

export default CloseButton;
