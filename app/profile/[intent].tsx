import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CONTAINER, GRID, GRID_ROW } from "~/constants/Styles";
import { AvatarText } from "~/components/avatar-text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import PhoneInput from "~/components/phone-input"; // Your PhoneInput component
import { Icon } from "~/components/icon";
import { IconButton } from "~/components/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Form } from "~/components/form";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormMessage, FormItem, FormLabel } from "~/components/form";
import OnlineOnly from "~/components/online-only";
import NextButtonGroup from "../../components/ui/next-button-group";
import useUserStore from "~/store/use-user-store";
import { patchUser } from "~/api/auth/patch-user";
import Toast from "react-native-toast-message";

const formSchema = z.object({
  img: z.string().nonempty({ message: "ต้องเลือกโปรไฟล์รูปภาพ" }), // Image is required
  name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
  phone: z.string().min(9, { message: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ" }), // Ensure phone number is required
});

const Index = () => {
  const { intent } = useLocalSearchParams();
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      img: "",
      phone: "",
    },
  });

  const pickImage = async (onChange: (value: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri); // Set the image URI for display
      onChange(imageUri.split("/").pop() || ""); // Update form's img field with filename
    }
  };

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (
    values
  ) => {
    const setUser = useUserStore.getState().setUser;
    setUser({
      profileImage: values.img,
      storeName: values.name,
      phoneNumber: values.phone,
    });

    if (intent === "create") {
      router.navigate("/term-and-service"); // Navigate to Terms screen without params
    } else if (intent === "edit") {
      const response = await patchUser(values);

      if (response.status === 200) {
        Toast.show({
          text1: "อัพเดตข้อมูลผู้ใช้สำเร็จ",
          type: "success",
        });

        router.back();
      } else {
        Toast.show({
          text1: "อัพเดตข้อมูลไม่สำเร็จ",
          type: "error",
        });
      }
    }
  };

  return (
    <SafeAreaView>
      <View
        className={cn(CONTAINER, "flex flex-col justify-between h-full mx-4")}
      >
        <View className="flex flex-col gap-5">
          <Text className={cn(TITLE, "")}>ข้อมูลร้านค้า</Text>
          <View className="flex flex-col gap-12">
            <View className="flex flex-col items-center justify-center gap-2">
              <AvatarText
                url={
                  image ||
                  "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
                }
              />
              <Controller
                control={control}
                name="img"
                render={({ field: { onChange, value } }) => (
                  <FormItem>
                    <Button
                      variant={"ghost"}
                      onPress={() => pickImage(onChange)}
                    >
                      <Text className={cn(PARAGRAPH, "")}>เปลี่ยนโปรไฟล์</Text>
                    </Button>
                    <FormMessage errorMessage={errors.img?.message} />
                  </FormItem>
                )}
              />
            </View>

            <Form className={cn(GRID, "")}>
              <View className={cn(GRID, "")}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormItem>
                      <FormLabel nativeID="name">ชื่อผู้ใช้</FormLabel>
                      <Input
                        placeholder="สมพงการค้า"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <FormMessage errorMessage={errors.name?.message} />
                    </FormItem>
                  )}
                />
              </View>

              <View className="flex flex-col gap-2">
                <View className={cn(GRID_ROW, "items-center")}>
                  <Text className={cn(PARAGRAPH, "items-center")}>
                    เบอร์โทร
                  </Text>
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                      <TouchableOpacity>
                        <Icon name="Info" size={16} />
                      </TouchableOpacity>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Text className={cn(PARAGRAPH, "")}>
                        ใช้ในการส่ง sms เเจ้งเตือน
                      </Text>
                    </TooltipContent>
                  </Tooltip>
                </View>
                <Controller
                  control={control}
                  name="phone"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <FormItem>
                      <PhoneInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                      />
                      <FormMessage errorMessage={errors.phone?.message} />
                    </FormItem>
                  )}
                />
              </View>
            </Form>
          </View>
        </View>

        <NextButtonGroup
          onNext={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnlineOnly(Index);
