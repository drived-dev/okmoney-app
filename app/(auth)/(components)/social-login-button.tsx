import React, { useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IconButton } from "~/components/icon-button";
import useUserStore from "~/store/use-user-store";
import { getUser } from "~/api/auth/get-user";

// เรียกใช้นอก component เพื่อความเสถียร (หรือใส่ไว้ใน component ก็ได้ถ้ามีการเปลี่ยน type)
WebBrowser.maybeCompleteAuthSession();

interface SocialLoginButtonProps {
  icon: string;
  text: string;
  type: "google" | "line" | "apple";
}

export default function SocialLoginButton({
  icon,
  text,
  type,
}: SocialLoginButtonProps) {
  const router = useRouter();
  const { setUser } = useUserStore();

  const BACKEND_AUTH_URL = `${process.env.EXPO_PUBLIC_API_URL}/auth/${type}/login`;

  // --- 1. แยก Logic การจัดการ Redirect ออกมาเป็น useCallback ---
  const handleRedirect = useCallback(
    async (url: string) => {
      if (!url) return;

      try {
        const parsedUrl = Linking.parse(url);
        const { queryParams } = parsedUrl;
        const {
          token,
          refreshToken: newRefreshToken,
          userId,
        } = queryParams || {};

        if (token && newRefreshToken) {
          // เก็บ Token
          await Promise.all([
            AsyncStorage.setItem("token", token as string),
            AsyncStorage.setItem("refreshToken", newRefreshToken as string),
          ]);

          // ดึงข้อมูล User และตัดสินใจว่าจะส่งไปหน้าไหน
          const response = await getUser();
          const userData = response.data;

          if (userData && userData.storeName) {
            setUser(userData);
            router.replace("/(screen)/(tabs)");
          } else {
            // กรณีสมัครใหม่/ยังไม่มีชื่อร้าน
            setUser({ id: userId as string });
            router.replace("/(screen)/profile/create");
          }
        }
      } catch (error) {
        console.error("[Debug] Redirect Error:", error);
      }
    },
    [router, setUser]
  );

  // --- 2. จัดการเรื่อง Deep Link Listener ด้วย useEffect ---
  useEffect(() => {
    // ตรวจสอบ URL เมื่อแอปถูกเปิดจากสถานะปิดสนิท
    const checkInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleRedirect(initialUrl);
    };

    checkInitialUrl();

    // ฟังเหตุการณ์เมื่อมีการเปิด URL ขณะแอปทำงานอยู่
    const subscription = Linking.addEventListener("url", (event) => {
      handleRedirect(event.url);
    });

    return () => subscription.remove();
  }, [handleRedirect]);

  // --- 3. ฟังก์ชันสำหรับกดปุ่ม Login ---
  const signInWithSocial = async () => {
    try {
      const redirectUri = Linking.createURL(`auth/${type}`);
      const authUrl = `${BACKEND_AUTH_URL}?redirect_uri=${encodeURIComponent(
        redirectUri
      )}`;

      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri,
        {
          showInRecents: true,
          dismissButtonStyle: "cancel",
        }
      );

      // ถ้า Browser สำเร็จ ให้ส่ง URL ไปประมวลผลต่อ
      if (result.type === "success" && result.url) {
        await handleRedirect(result.url);
      }
    } catch (error) {
      console.error("[Debug] Sign in Error:", error);
    }
  };

  return (
    <IconButton
      icon={icon}
      text={text}
      variant="green"
      size="xl"
      textClassName="flex-1"
      onPress={signInWithSocial}
    />
  );
}
