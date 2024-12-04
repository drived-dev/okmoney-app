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

const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "เบอร์โทรศัทพ์ต้องมีอย่างน้อย 10 ตัวอักษร" }),
});

const PhoneLoginForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
  });

  function onSubmit(data: z.infer<typeof phoneSchema>) {
    router.navigate({
      pathname: "/phone-login",
      params: { phoneNumber: data.phoneNumber },
    });
  }

  return (
    <View className="flex flex-col gap-2">
      <View className={cn(GRID)}>
        <Text className={cn(TITLE, "text-foreground")}>เข้าร่วมผ่านเบอร์</Text>

        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, value } }) => (
            <PhoneInput value={value} onChangeText={onChange} />
          )}
        />
        <FormMessage errorMessage={errors.phoneNumber?.message} />

        <Button onPress={handleSubmit(onSubmit)}>
          <Text className={cn(PARAGRAPH_BOLD, "text-background")}>
            ต่อไป {/* Remove error message from here */}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default PhoneLoginForm;
