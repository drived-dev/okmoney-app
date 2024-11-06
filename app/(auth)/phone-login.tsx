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
import NextButtonGroup from "../../components/ui/next-button-group";
import Toast from "react-native-toast-message";

const PhoneLogin = () => {
  const router = useRouter();
  const otpLength = 4;
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [timeDelayLeft, setTimeDelayLeft] = useState(10);
  const otpInputRef = useRef<OtpInputRef>(null);
  function handleVerifyOtp() {
    // TODO: verify otp

    const isOtpValid = true;
    if (isOtpValid) {
      router.navigate("/profile");
    } else {
      resetOtp();
      Toast.show({
        type: "error",
        position: "bottom",
        text2: "เลขที่ส่งไปที่เบอร์โทรศัทพ์ของคุณไม่ถูกต้อง",
      });
    }
  }

  function handleResendOtp() {
    // TODO: send otp to phone number
    setTimeDelayLeft(10);
  }

  function resetOtp() {
    otpInputRef.current?.clear();
  }

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

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, " h-full flex flex-col")}>
        <View className="flex-1 pt-10">
          <Text className={cn(TITLE)}>กรอกเลข 4 หลักที่ส่งไปที่</Text>
          <Text className={cn(TITLE)}>{phoneNumber}</Text>
          <View className="flex flex-col gap-3 items-start">
            <OtpInput
              numberOfDigits={otpLength}
              onTextChange={setOtp}
              onFilled={handleVerifyOtp}
              focusColor={"#F58737"}
              ref={otpInputRef}
              textInputProps={{
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: {
                  justifyContent: "flex-start",
                  gap: 10,
                },
                pinCodeContainerStyle: {
                  width: 50,
                  height: 50,
                  backgroundColor: colors.gray[100],
                },
              }}
            />
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
          </View>
        </View>
        <NextButtonGroup
          onNext={handleVerifyOtp}
          disabled={otp.length !== otpLength}
        />
      </View>
    </SafeAreaView>
  );
};

export default PhoneLogin;
