import React from "react";
import { View, Image, Text } from "react-native";
import { Loan } from "~/types/Loan";
import { Icon } from "../icon";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import { LABEL, PARAGRAPH, TITLE } from "~/constants/Typography";
import Svg, { Circle } from "react-native-svg";

interface GridComponentProps {
  data: Loan[];
}

export const GridComponent: React.FC<GridComponentProps> = ({ data }) => {
  return (
    <View
      className={cn(CONTAINER, "flex flex-row flex-wrap justify-between mt-5")}
      style={{
        paddingHorizontal: 10,
      }}
    >
      {data.map((item, index) => (
        <View
          key={item.id}
          className="bg-card p-3 rounded-lg shadow-sm mb-4 border border-border"
          style={{
            width: "48%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            marginBottom: 15,
            marginRight: index % 2 === 0 ? 10 : 0,
          }}
        >
          <View className="relative justify-center items-center">
            <View className="absolute top-0 right-0">
              <Button variant={"link"} size={"icon"}>
                <Icon name="Ellipsis" size={18} color="#A1A1AA" />
              </Button>
            </View>

            {/* SVG Circular Progress - Start at 7 o'clock and end at 5 o'clock */}
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Svg height="80" width="80" viewBox="0 0 100 100">
                {/* Background Circle */}
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#E5E5E5"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="167, 84" // Visible arc (240 degrees)
                  strokeDashoffset="72" // Adjusted start point to 7 o'clock
                />
                {/* Foreground Circle Progress */}
                <Circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#FF6B35"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={`${(item.percent ?? 0) * 1.67}, 251`} // Progress fill within the arc
                  strokeDashoffset="72" // Match the same start as background arc
                />
              </Svg>

              {/* Profile Image in Center */}
              <View style={{ position: "absolute", top: 10, left: 10 }}>
                <Image
                  source={{ uri: item.profileImage }}
                  style={{ width: 60, height: 60, borderRadius: 30 }}
                />
              </View>
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
