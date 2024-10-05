import React from "react";
import { View, Image, Text } from "react-native";
import { Loan } from "~/types/Loan";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";

interface GridComponentProps {
  data: Loan[];
}

export const GridComponent: React.FC<GridComponentProps> = ({ data }) => {
  return (
    <View
      className={cn(CONTAINER, "flex flex-row flex-wrap justify-between mt-5")}
      style={{
        paddingHorizontal: 10, // Padding around the entire grid
      }}
    >
      {data.map((item, index) => (
        <View
          key={item.id}
          className="bg-card p-3 rounded-lg shadow-sm mb-4 border border-border"
          style={{
            width: "48%", // Ensures two items per row
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2, // Android shadow

            // Apply margin spacing between items
            marginBottom: 15,
            marginRight: index % 2 === 0 ? 10 : 0, // Apply right margin to the first item in each row
          }}
        >
          {/* Progress indicator wrapping around the circular image */}
          <View className="relative justify-center items-center">
            <View className="absolute top-0 right-0">
              <Button variant={"link"} size={"icon"}>
                <Icon name="Ellipsis" size={18} color="#A1A1AA" />
              </Button>
            </View>
            <View className="w-16 h-16 rounded-full items-center justify-center">
              <Image
                source={{ uri: item.profileImage }}
                className="w-14 h-14 rounded-full"
              />
            </View>
            {/* Placeholder for circular progress around the image */}
            <View className="absolute inset-0 w-full h-full">
              {/* Insert your progress indicator here if it's an SVG or similar */}
            </View>
          </View>

          {/* Text content */}
          <View className="mt-3 items-center justify-center">
            <Text className={cn(PARAGRAPH, "text-sm text-gray-500")}>
              เลขสัญญา {item.id}
            </Text>
            <Text
              className={cn(TITLE, "text-lg font-bold text-foreground mt-1")}
            >
              {item.nickname}
            </Text>
            <Text className={cn(LABEL, "text-sm text-gray-600")}>
              {item.name}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
