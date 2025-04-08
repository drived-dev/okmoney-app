import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { cn } from "~/lib/utils";
import {
  LABEL,
  PARAGRAPH,
  PARAGRAPH_BOLD,
  SUBHEADER,
  TITLE,
} from "~/constants/Typography";
import { IconButton } from "~/components/icon-button";
import { ArrowRight, Icon } from "lucide-react-native";
import { CONTAINER, GRID, GRID_ROW } from "~/constants/Styles";
import { useRouter } from "expo-router";
import PhoneInput from "~/components/phone-input";
import { Button } from "~/components/ui/button";
import { ThemeToggle } from "~/components/ThemeToggle";
import { TouchableOpacity } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage } from "~/components/form";
import { Input } from "~/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUserStore from "~/store/use-user-store";
import SocialLoginButton from "../(components)/social-login-button";
import PhoneLoginForm from "../(components)/phone-login-form";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  const router = useRouter();

  const user = useUserStore();
  useEffect(() => {
    user.setUser({ id: "" });
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("refreshToken");
  }, []);

  async function bypass() {
    await AsyncStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZ29vZ2xlIiwic3ViIjoiNG9iVW5ZUlY3NGV5bnlaemVOYnIiLCJpYXQiOjE3MzIzNTY3NzUsImV4cCI6MTczMjM2MDM3NX0.5_WCglp5MlnWP_uceqEEgzISARrmorCuBrlwlNhK64I" as string
    );
    await AsyncStorage.setItem(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiZ29vZ2xlIiwic3ViIjoiNG9iVW5ZUlY3NGV5bnlaemVOYnIiLCJpYXQiOjE3MzIzNTY3NzUsImV4cCI6MTczMjk2MTU3NX0.WeNmGX8qpu5y1yYGIpHFqETa8bmxWSK2083B7XI0FTI" as string
    );
    router.navigate("/(tabs)");
  }

  return (
    <View className="h-full">
      <SafeAreaView>
        <View className={cn(CONTAINER, "mt-20 mx-4")}>
          <View className="flex flex-col gap-8">
            <View className="flex flex-col">
              <Text className={cn(SUBHEADER, "text-foreground")}>
                เลือกช่องทาง{"\n"}การสมัคร/เข้าสู่ระบบ
              </Text>
            </View>
            <PhoneLoginForm />

            <View className="flex flex-row items-center gap-2">
              <View className="flex-1 h-px bg-gray-500"></View>
              <Text className={cn(LABEL, "text-gray-500")}>หรือ</Text>
              <View className="flex-1 h-px bg-gray-500"></View>
            </View>
            <View className="felx flex-col gap-4">
              <View className="felx flex-col gap-2">
                <SocialLoginButton
                  icon={require("assets/images/line.png")}
                  text="เข้าร่วมผ่าน Line"
                  type="line"
                />
                <SocialLoginButton
                  icon={require("assets/images/google.png")}
                  text="เข้าร่วมผ่าน Google"
                  type="google"
                />
                {/* 
                  <SocialLoginButton
                    icon={require("assets/images/facebook.png")}
                    text="เข้าร่วมผ่าน Facebook"
                    type="facebook"
                  /> */}
              </View>

              <Button variant={"link"} onPress={() => bypass()}>
                <Text className={cn(PARAGRAPH, "text-foreground underline")}>
                  ลืมรหัสผ่าน?
                </Text>
              </Button>
            </View>
          </View>
          <View className="justify-center items-center flex flex-col mt-10">
            <View className="flex flex-row">
              <Text className={cn(PARAGRAPH, " text-gray-500")}>
                การเข้าสู่ระบบแสดงว่าคุณยอมรับ
              </Text>
              <TouchableOpacity
                onPress={() => router.navigate("/term-and-service")}
              >
                <Text className={cn(PARAGRAPH, " text-gray-500 underline")}>
                  นโยบายความเป็นส่วนตัว
                </Text>
              </TouchableOpacity>
            </View>

            <Text className={cn(PARAGRAPH, " text-gray-500")}>
              และข้อกำหนดการใช้งานของเรา
            </Text>
          </View>
          <Text className={cn(PARAGRAPH, " text-gray-500 text-center mt-4")}>
            ทางเราไม่เก็บรวบรวมข้อมูลการโต้ตอบกับแอปเพื่อวัตถุประสงค์ทางโฆษณาโดยไม่ได้รับความยินยอมจากผู้ใช้
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
