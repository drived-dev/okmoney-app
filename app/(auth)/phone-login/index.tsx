import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";
import { CONTAINER } from "~/constants/Styles";
import { cn } from "~/lib/utils";
import { PARAGRAPH, PARAGRAPH_BOLD, TITLE } from "~/constants/Typography";
import { Button } from "~/components/ui/button";
import colors from "tailwindcss/colors";
import { IconButton } from "~/components/icon-button";
import { ArrowLeft } from "lucide-react-native";
import NextButtonGroup from "~/components/ui/next-button-group";
import Toast from "react-native-toast-message";
import { sendOtp, verifyOtp } from "~/api/auth/phone-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "~/api/auth/get-user";
import useUserStore from "~/store/use-user-store";

const PhoneLogin = () => {
  const router = useRouter();
  const otpLength = 6;
  const { phoneNumber }: { phoneNumber: string } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [timeDelayLeft, setTimeDelayLeft] = useState(10);
  const otpInputRef = useRef<OtpInputRef>(null);
  const { setUser, accessToken, refreshToken } = useUserStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelayLeft((prev) => prev - 1);
    }, 1000);
    if (timeDelayLeft <= 0) {
      clearInterval(interval);
      setTimeDelayLeft(0);
    }
    return () => clearInterval(interval);
  }, [timeDelayLeft]);

  useEffect(() => {
    handleSendOtp();
  }, []);

  async function handleVerifyOtp(registedOtp: string) {
    console.log("registedOtp", registedOtp);
    console.log("otp", typeof registedOtp);
    console.log("phoneNumber", phoneNumber);

    const response = await verifyOtp(phoneNumber, registedOtp);
    const data = response.data;
    if (response.status === 200) {
      if (!data.accessToken || !data.refreshToken) return;

      await AsyncStorage.setItem("token", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);

      const response = await getUser();
      if (response.status !== 200) return;
      const userData = response.data;
      if (userData.storeName !== null && userData.storeName !== "") {
        setUser(userData);
        return router.push("/(screen)/(tabs)");
      } else {
        setUser({
          id: userData.id as string,
          phoneNumber: userData.phoneNumber as string,
        });
      }
      router.push("/(screen)/profile/create"); // Navigate to Profiles page after authentication
    } else {
      resetOtp();
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "ผิดพลาด",
        text2: "โปรดลองอีกครั้ง",
      });
    }
  }

  async function handleResendOtp() {
    await handleSendOtp();
    setTimeDelayLeft(10);
  }

  function resetOtp() {
    otpInputRef.current?.clear();
  }

  const handleSendOtp = async () => {
    const response = await sendOtp(phoneNumber);
    if (response.status === 200) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "ส่งรหัส OTP สำเร็จ",
        text2: "โปรดตรวจสอบรหัส OTP ที่ส่งไปที่เบอร์โทรศัทพ์ของคุณ",
      });
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "ส่งรหัส OTP ไม่สำเร็จ",
        text2: "กรุณาตรวจสอบเบอร์โทรศัทพ์ของคุณ",
      });
    }
  };

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, " h-full flex flex-col")}>
        <View className="flex-1 pt-10">
          <Text className={cn(TITLE)}>กรอกเลข 4 หลักที่ส่งไปที่</Text>
          <Text className={cn(TITLE)}>{phoneNumber}</Text>
          <View className="mt-10 flex flex-col gap-4 items-start">
            <OtpInput
              numberOfDigits={otpLength}
              onTextChange={setOtp}
              onFilled={(registedOtp) => handleVerifyOtp(registedOtp)}
              focusColor={"#F58737"}
              ref={otpInputRef}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: {
                  justifyContent: "flex-start",
                  gap: 6,
                },
                pinCodeContainerStyle: {
                  width: 50,
                  height: 50,
                  backgroundColor: colors.gray[100],
                },
              }}
            />
            <View className="w-full flex flex-row justify-between gap-2">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="flex flex-row items-center gap-2 rounded-lg"
                disabled={timeDelayLeft > 0}
                onPress={handleResendOtp}
              >
                <Text className={cn(PARAGRAPH, "text-foreground")}>
                  ส่งอีกครั้ง
                  {timeDelayLeft > 0
                    ? ` (${`${Math.floor(timeDelayLeft / 60)}:${String(
                        timeDelayLeft % 60
                      ).padStart(2, "0")}`})`
                    : null}
                </Text>
                <Text className={cn(PARAGRAPH, "text-foreground")}></Text>
              </Button>
              <Button
                variant={"link"}
                size={"sm"}
                onPress={resetOtp}
                className="flex flex-row items-center gap-2 rounded-lg"
              >
                <Text className={cn(PARAGRAPH, "text-foreground")}>
                  ล้างรหัส OTP
                </Text>
              </Button>
            </View>
          </View>
        </View>
        <NextButtonGroup
          onNext={() => handleVerifyOtp(otp)}
          disabled={otp.length !== otpLength}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhoneLogin;
