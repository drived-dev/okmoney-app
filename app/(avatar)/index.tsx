import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { CONTAINER, FORM, ROW } from "~/constants/Styles";
import { AvatarText } from "~/components/avatar-text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import PhoneInput from "~/components/phone-input";
import { Icon } from "~/components/icon";
import { IconButton } from "~/components/icon-button";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker"; // Import ImagePicker
import { Form } from "~/components/form";

const index = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<string | null>(null); // Allow image state to accept string or null

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  // Function to handle picking an image
  const pickImage = async () => {
    // Request media library permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image library picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Set the picked image URI to state
    }
  };

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "mt-20 flex flex-col gap-80 mx-4")}>
        <View className="flex flex-col gap-5">
          <Text className={cn(TITLE, "")}>ข้อมูลร้านค้า</Text>
          <View className="flex flex-col gap-12">
            <View className="flex flex-col items-center justify-center gap-2">
              {/* Display selected image or default avatar */}
              <AvatarText
                url={
                  image ||
                  "https://img.freepik.com/free-photo/happy-boy-with-adorable-smile_23-2149352352.jpg"
                }
              />
              {/* Change Img button */}
              <Button variant={"ghost"} onPress={pickImage}>
                <Text className={cn(PARAGRAPH, "")}>เปลี่ยนโปรไฟล์</Text>
              </Button>
            </View>
            <Form className={cn(FORM, "")}>
              <View className={cn(FORM, "")}>
                <Text>ชื่อผู้ใช้</Text>
                <Input
                  placeholder="ชื่อผู้ใช้งาน"
                  keyboardType="ascii-capable"
                  maxLength={20}
                />
              </View>
              <View className="flex flex-col gap-2">
                <View className={cn(ROW, "items-center")}>
                  <Text>เบอร์โทร</Text>
                  {/* Icon */}
                  <Tooltip delayDuration={150}>
                    <TooltipTrigger asChild>
                      <TouchableOpacity>
                        <Icon name="Info" size={16}></Icon>
                      </TouchableOpacity>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Text className={cn(PARAGRAPH, "")}>
                        ใช้ในการส่ง sms เเจ้งเตือน
                      </Text>
                    </TooltipContent>
                  </Tooltip>
                </View>

                <PhoneInput></PhoneInput>
              </View>
            </Form>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <IconButton
            icon={<ArrowLeft />}
            size={"icon-lg"}
            className="items-center justify-center"
            variant="ghost"
            onPress={() => router.back()}
          />
          <IconButton
            icon={<ArrowRight />}
            text="ต่อไป"
            iconPosition="right"
            size={"lg"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
