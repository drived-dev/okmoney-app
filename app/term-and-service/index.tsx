import { View, SafeAreaView, ScrollView, LayoutAnimation } from "react-native";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { CONTAINER } from "~/constants/Styles";
import { Text } from "~/components/ui/text";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { Term } from "~/types/term";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { IconButton } from "~/components/icon-button";
import { useRouter } from "expo-router"; // Assuming you're using Expo Router

const demodata: Term = {
  description:
    "สไปเดอร์เอ็กซ์เพรสโฮป ดีเจยูวีซูฮกปาสคาลนิว โชห่วยบลูเบอร์รี่ เอาท์จิ๊กซอว์ตัวตนป๋อหลอโมเต็ล รีพอร์ท สุนทรีย์แฟร์เอาท์ดอร์มลภาวะ เอสเพรสโซมาร์กเยอร์บีร่านินจาวานิลา หลินจือกษัตริยาธิราช ไฮไลต์แหม็บกรีนโบว์ลิ่ง โมเต็ลคอร์ปอเรชั่นโซลาร์ฟลุก มอคค่า สเตริโอพรีเซ็นเตอร์แกสโซฮอล์ มาร์ชเพนตากอน ศากยบุตรดีพาร์ทเมนท์ เบิร์นมอนสเตอร์เทวาธิราชงั้น ปัจฉิมนิเทศแบตซิ่งแฟร์แซลมอน เซ็กซี่สโตนใช้งานบาบูนวิภัชภาค สตรอว์เบอร์รีดีไซน์ ซิลเวอร์แคร็กเกอร์โค้กดัมพ์สตรอเบอรี ผลไม้โหลนแอปพริคอท ดิกชันนารีเป็นไงกราวนด์ ฟยอร์ดป๊อปสหัชญาณตุ๋ย บูติคโมหจริตตื้บคอร์ป สมิติเวชป๊อกไชน่าบลูเบอร์รี ดัมพ์ ดยุกโก๊ะเฮอร์ริเคน แฟรีตังค์ระโงกออเดอร์ สตรอเบอรีโปรเจกเตอร์เซรามิก ดีมานด์คลับซาตานแรงดูด จิตพิสัยอาว์ปิกอัพเอนทรานซ์ช็อปเปอร์ อาร์ติสต์ทิปมหาอุปราชา โปรดิวเซอร์ มวลชนดยุก แพตเทิร์นวาซาบิเป่ายิงฉุบโอเวอร์ พ่อค้านายแบบมอคคาโอเพ่น แรลลี่ซาตานออเดอร์ แมชีนพรีเมียร์ มหภาค สงบสุขฟลอร์ ดัมพ์รีพอร์ทฮิ เอ็นเตอร์เทนน้องใหม่ เซ็กซ์ เชอร์รี่แดนซ์สถาปัตย์รีพอร์ทเฟอร์รี่ ฮิปโปไคลแมกซ์ออกแบบแดรี่พรีเซ็นเตอร์ สไปเดอร์เอ็กซ์เพรสโฮป ดีเจยูวีซูฮกปาสคาลนิว โชห่วยบลูเบอร์รี่ เอาท์จิ๊กซอว์ตัวตนป๋อหลอโมเต็ล รีพอร์ท สุนทรีย์แฟร์เอาท์ดอร์มลภาวะ เอสเพรสโซมาร์กเยอร์บีร่านินจาวานิลา หลินจือกษัตริยาธิราช ไฮไลต์แหม็บกรีนโบว์ลิ่ง โมเต็ลคอร์ปอเรชั่นโซลาร์ฟลุก มอคค่า สเตริโอพรีเซ็นเตอร์แกสโซฮอล์ มาร์ชเพนตากอน ศากยบุตรดีพาร์ทเมนท์ เบิร์นมอนสเตอร์เทวาธิราชงั้น ปัจฉิมนิเทศแบตซิ่งแฟร์แซลมอน เซ็กซี่สโตนใช้งานบาบูนวิภัชภาค สตรอว์เบอร์รีดีไซน์ ซิลเวอร์แคร็กเกอร์โค้กดัมพ์สตรอเบอรี ผลไม้โหลนแอปพริคอท ดิกชันนารีเป็นไงกราวนด์ ฟยอร์ดป๊อปสหัชญาณตุ๋ย สแควร์ตุ๊กเอสเพรสโซคลิป บูติคโมหจริตตื้บคอร์ป สมิติเวชป๊อกไชน่าบลูเบอร์รี ดัมพ์ ดยุกโก๊ะเฮอร์ริเคน แฟรีตังค์ระโงกออเดอร์ สตรอเบอรีโปรเจกเตอร์เซรามิก ดีมานด์คลับซาตานแรงดูด จิตพิสัยอาว์ปิกอัพเอนทรานซ์ช็อปเปอร์ อาร์ติสต์ทิปมหาอุปราชา โปรดิวเซอร์ มวลชนดยุก แพตเทิร์นวาซาบิเป่ายิงฉุบโอเวอร์ พ่อค้านายแบบมอคคาโอเพ่น แรลลี่ซาตานออเดอร์ แมชีนพรีเมียร์ มหภาค สงบสุขฟลอร์ ดัมพ์รีพอร์ทฮิ เอ็นเตอร์เทนน้องใหม่ เซ็กซ์ เชอร์รี่แดนซ์สถาปัตย์รีพอร์ทเฟอร์รี่ ฮิปโปไคลแมกซ์ออกแบบแดรี่พรีเซ็นเตอร์ สไปเดอร์เอ็กซ์เพรสโฮป ดีเจยูวีซูฮกปาสคาลนิว โชห่วยบลูเบอร์รี่ เอาท์จิ๊กซอว์ตัวตนป๋อหลอโมเต็ล รีพอร์ท สุนทรีย์แฟร์เอาท์ดอร์มลภาวะ เอสเพรสโซมาร์กเยอร์บีร่านินจาวานิลา หลินจือกษัตริยาธิราช ไฮไลต์แหม็บกรีนโบว์ลิ่ง โมเต็ลคอร์ปอเรชั่นโซลาร์ฟลุก มอคค่า สเตริโอพรีเซ็นเตอร์แกสโซฮอล์ มาร์ชเพนตากอน ศากยบุตรดีพาร์ทเมนท์ เบิร์นมอนสเตอร์เทวาธิราชงั้น ปัจฉิมนิเทศแบตซิ่งแฟร์แซลมอน เซ็กซี่สโตนใช้งานบาบูนวิภัชภาค สตรอว์เบอร์รีดีไซน์ ซิลเวอร์แคร็กเกอร์โค้กดัมพ์สตรอเบอรี ผลไม้โหลนแอปพริคอท ดิกชันนารีเป็นไงกราวนด์ ฟยอร์ดป๊อปสหัชญาณตุ๋ย สแควร์ตุ๊กเอสเพรสโซคลิป บูติคโมหจริตตื้บคอร์ป สมิติเวชป๊อกไชน่าบลูเบอร์รี ดัมพ์ ดยุกโก๊ะเฮอร์ริเคน แฟรีตังค์ระโงกออเดอร์ สตรอเบอรีโปรเจกเตอร์เซรามิก ดีมานด์คลับซาตานแรงดูด จิตพิสัยอาว์ปิกอัพเอนทรานซ์ช็อปเปอร์ อาร์ติสต์ทิปมหาอุปราชา โปรดิวเซอร์ มวลชนดยุก แพตเทิร์นวาซาบิเป่ายิงฉุบโอเวอร์ พ่อค้านายแบบมอคคาโอเพ่น แรลลี่ซาตานออเดอร์ แมชีนพรีเมียร์ มหภาค สงบสุขฟลอร์ ดัมพ์รีพอร์ทฮิ เอ็นเตอร์เทนน้องใหม่ เซ็กซ์ เชอร์รี่แดนซ์สถาปัตย์รีพอร์ทเฟอร์รี่ ฮิปโปไคลแมกซ์ออกแบบแดรี่พรีเซ็นเตอร์",
  update: "21 กพ. 65",
};

const index = () => {
  const [isBottomReached, setIsBottomReached] = useState(false);
  const router = useRouter(); // Using Expo Router for navigation

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    // Once scrolled to bottom, allow navigation
    if (isScrolledToBottom && !isBottomReached) {
      LayoutAnimation.easeInEaseOut();
      setIsBottomReached(true);
    }
  };

  const handleNextPage = () => {
    if (isBottomReached) {
      router.navigate("/(tabs)"); // Replace with your next page route
    }
  };

  return (
    <View className="h-full">
      <SafeAreaView>
        <ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16} // Controls scroll event frequency
        >
          <View className={cn(CONTAINER, "px-8")}>
            <View className="flex flex-col gap-4">
              <View className="flex flex-col gap-1">
                <Text className={cn(TITLE, "")}>
                  กรุณาพิจรณา{"\n"}นโยบายความเป็นส่วนตัว
                </Text>
                <Text className={cn(PARAGRAPH, "text-[#949494]")}>
                  อัปเดตล่าสุด: {demodata.update}
                </Text>
              </View>

              <View>
                <Text className={cn(PARAGRAPH, "")}>
                  {demodata.description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Card is always visible */}
      <View className="mt-auto justify-center items-center pb-10">
        <Card className="w-full max-w-sm">
          <View className="px-4 pt-4 pb-2">
            <CardDescription className={cn(PARAGRAPH, "text-foreground")}>
              จากการกด “ยินยอม” เเปลว่าคุณได้ยอมรับเงื้อนไขการใช้งานของ Ok Money
            </CardDescription>
          </View>

          <CardFooter className="justify-between">
            <IconButton
              icon={<ArrowLeft />}
              variant="green"
              size={"icon-lg"}
              className="items-center"
            />

            <IconButton
              icon={<ArrowRight />}
              text="ยอมรับ"
              // The button starts green and only changes to "default" after reaching the bottom
              variant={isBottomReached ? "default" : "outline"}
              className="items-center"
              iconPosition="right"
              onPress={handleNextPage}
            />
          </CardFooter>
        </Card>
      </View>
    </View>
  );
};

export default index;
