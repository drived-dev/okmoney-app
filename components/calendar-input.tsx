import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { IconButton, IconButtonProps } from "./icon-button";
import { Calendar } from "lucide-react-native";
import { cn } from "~/lib/utils";

interface CalendarInputProps
  extends Pick<
    Partial<IconButtonProps>,
    "variant" | "fontWeight" | "iconPosition" | "className"
  > {
  value: string;
  onChange: (date: Date) => void;
}

const CalendarInput = ({
  value,
  onChange,
  className,
  ...props
}: CalendarInputProps) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChange(date);
    hideDatePicker();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = ("0" + date.getUTCDate()).slice(-2);
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear().toString().slice(-2);

    return `${day} / ${month} / ${year}`;
  };

  return (
    <View>
      <IconButton
        onPress={showDatePicker}
        text={formatDate(value)}
        variant="ghost"
        fontWeight="normal"
        iconPosition="right"
        className={cn("flex justify-between", className)}
        icon={<Calendar size={20} />}
        {...props}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CalendarInput;
