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
import { addMemo } from "~/api/payment/add-memo";
import useEditingLoanStore from "~/store/use-editing-loan-store";
const amountMemoSchema = z.object({
  amount: z.coerce.number(),
  img: z.string().optional(), // Image is optional
});

const MemoSheet = forwardRef((propTypes, bottomSheetModalRef) => {
  const { id, removeId } = useEditingLoanStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof amountMemoSchema>>({
    resolver: zodResolver(amountMemoSchema),
  });
  const [image, setImage] = useState<string>();

  const pickImage = async (onChange: (value: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
      base64: true,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const filename = `${Date.now()}.jpg`;
      const type = "image/jpeg";

      const file = {
        uri: imageUri,
        name: filename,
        type: type,
      };

      setImage(imageUri);
      onChange(filename);
      return file;
    }
  };

  async function onSubmit(data: z.infer<typeof amountMemoSchema>) {
    //TODO: dynamic id
    const formJson = {
      loanId: id,
      creditorId: "WDrdqXCNOr9YHRmo8uDy",
      debtorId: "UYEl94EYuO5AYO9XcUMy",
      amount: Number(data.amount),
      paymentType: image ? "TRANSFER" : "CASH",
    };

    let formData = new FormData();
    formData.append("data", JSON.stringify(formJson));
    if (image) {
      formData.append("file", {
        uri: image,
        name: `${Date.now()}.jpg`,
        type: "image/jpeg",
      } as any);
    }

    const response = await addMemo(formData);
    console.log(response);
    if (response.status === 201) {
      Toast.show({
        type: "success",
        position: "bottom",
        text1: `บันทึกสำเร็จ`,
        text2: `บันทึกจำนวนเงิน ${data.amount} บาท`,
      });
      bottomSheetModalRef.current?.close();
    } else {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: `บันทึกไม่สำเร็จ`,
      });
    }
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
                placeholder=""
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
              <FormMessage errorMessage={errors.amount?.message} />
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
          onPress={handleSubmit(onSubmit)}
          className="mt-auto"
          icon={<NotebookPen />}
          text="บันทึกรายการ"
        ></IconButton>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const ImagePreview = ({
  image,
  setImage,
}: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
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
