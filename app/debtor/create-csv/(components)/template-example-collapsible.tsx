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
import { Asset, useAssets } from "expo-asset";
// import { Image } from "react-native";
// import exampleImage from "~/assets/images/placeholder.png";
import { Separator } from "~/components/ui/separator";

const TemplateExampleCollapsible = () => {
  const [assets, error] = useAssets(require("assets/images/placeholder.png"));

  return (
    <View>
      {/* {assets ? ( */}
      {/* <Image source={{ uri: exampleImageUri }} /> */}

      {/* ) : null} */}
      <Collapsible>
        <CollapsibleTrigger>
          <Card className="p-4">
            <CardHeader className="p-0 flex flex-row justify-between">
              <Text className={cn(PARAGRAPH)}>ตัวอย่างการกรอกข้อมูล</Text>
              <ChevronDown color="black" />
            </CardHeader>

            <CollapsibleContent className="flex-col gap-1">
              <Separator className="my-2" />
              <Text className={cn(PARAGRAPH)}>กรอกข้อมูลตามแบบฟอร์ม</Text>
              {assets ? (
                <Image
                  style={{
                    height: assets[0].height,
                    width: assets[0].width,
                  }}
                  //@ts-ignore
                  source={assets[0]}
                  contentFit="cover"
                  alt="template image"
                />
              ) : null}
            </CollapsibleContent>
          </Card>
        </CollapsibleTrigger>
      </Collapsible>
    </View>
  );
};

export default TemplateExampleCollapsible;
