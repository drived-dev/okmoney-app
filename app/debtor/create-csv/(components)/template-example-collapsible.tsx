import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Image } from "expo-image";
import { Button } from "~/components/ui/button";
import { IconButton } from "~/components/icon-button";
import {
  ChevronDown,
  FolderDotIcon,
  FolderUpIcon,
  Upload,
} from "lucide-react-native";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { Card, CardHeader } from "~/components/ui/card";

const TemplateExampleCollapsible = () => {
  return (
    <View>
      <Collapsible>
        <CollapsibleTrigger>
          <Card className="p-4">
            <CardHeader className="p-0 flex flex-row justify-between">
              <Text className={cn(PARAGRAPH)}>ตัวอย่างการกรอกข้อมูล</Text>
              <ChevronDown color="black" />
            </CardHeader>

            <CollapsibleContent>
              <Text className={cn(PARAGRAPH)}>กรอกข้อมูลตามแบบฟอร์ม</Text>
              <Image
                style={styles.image}
                className="w-20 h-20"
                source="https://reactnative.dev/img/tiny_logo.png"
                contentFit="cover"
                alt="template image"
              />
            </CollapsibleContent>
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    height: 100,
    width: 100,
    backgroundColor: "#0553",
  },
});

export default TemplateExampleCollapsible;
