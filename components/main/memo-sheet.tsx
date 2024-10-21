import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { IconButton } from "../icon-button";
import { FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../ui/input";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PARAGRAPH, TITLE } from "~/constants/Typography";
import { NotebookPen, X } from "lucide-react-native";
import { cn } from "~/lib/utils";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../ui/button";
import { AvatarText } from "../avatar-text";
import Toast from "react-native-toast-message";
const amountMemoSchema = z.object({
  amount: z.number(),
  img: z.string().optional(), // Image is required
});

const MemoSheet = forwardRef((propTypes, bottomSheetModalRef) => {
  const {
    control,
    formState: { errors },
  } = useForm<z.infer<typeof amountMemoSchema>>({
    resolver: zodResolver(amountMemoSchema),
  });
  const [image, setImage] = useState<string | null>(null);

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

      // Extract the filename from the URI
      const filename = imageUri.split("/").pop(); // Get the last part of the path

      setImage(imageUri); // You can still use the full URI if needed for the image display
      onChange(filename || ""); // Update the form's img field with just the filename
    }
  };

  function onSubmit() {
    // TODO: change info text
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Hello",
      text2: "This is some something 👋",
    });
  }

  // renders
  return (
    <BottomSheetModal ref={bottomSheetModalRef} style={styles.shadow}>
      <BottomSheetView style={styles.contentContainer}>
        <Text className={cn(TITLE, "-mb-2")}>บันทึกยอด</Text>
        <Controller
          control={control}
          name="amount"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="amount">ยอดที่จ่าย</FormLabel>
              <Input
                placeholder="โปรดใส่อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormMessage errorMessage={errors.name?.message} />
            </FormItem>
          )}
        />
        {image ? (
          <ImagePreview image={image} setImage={setImage} />
        ) : (
          <Controller
            control={control}
            name="img"
            render={({ field: { onChange, value } }) => (
              <FormItem>
                <IconButton
                  className="mt-auto self-start"
                  size="sm"
                  variant="outline"
                  icon={<NotebookPen size={16} />}
                  text="อัปโหลดหลักฐานการโอนเงิน"
                  onPress={() => pickImage(onChange)}
                ></IconButton>
                <FormMessage errorMessage={errors.img?.message}></FormMessage>
              </FormItem>
            )}
          />
        )}

        <IconButton
          onPress={onSubmit}
          className="mt-auto"
          icon={<NotebookPen />}
          text="บันทึกรายการ"
        ></IconButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const ImagePreview = ({ image, setImage }) => {
  return (
    <FormItem>
      <FormLabel nativeID="amount">หลักฐานการโอนเงินของคุณ</FormLabel>
      <View className="relative w-[100px] h-[100px]">
        <Image className="rounded-lg w-full h-full" source={{ uri: image }} />
        <Button
          size="icon"
          className="absolute right-1 top-1 rounded-full"
          onPress={() => setImage("")}
        >
          <X color="#ffffff" />
        </Button>
      </View>
    </FormItem>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000", // Shadow color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 2, // Vertical shadow offset
    },
    shadowOpacity: 0.25, // Shadow opacity (0 - 1 range)
    shadowRadius: 3.84, // Shadow blur radius
    elevation: 5,
  },
  contentContainer: {
    flex: 1,
    minHeight: 350,
    gap: 16,
    padding: 20,
    width: "100%",
  },
});

export default MemoSheet;
