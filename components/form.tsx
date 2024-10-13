import {
  Keyboard,
  Text,
  TextProps,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { LABEL } from "~/constants/Typography";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { CircleAlert } from "lucide-react-native";
import colors from "tailwindcss/colors";

interface FormLabelProps extends TextProps {
  nativeID: string;
  children?: TextProps["children"];
  className?: string;
  optional?: boolean;
}

const FormOptionalText = () => {
  return <Text className={cn(LABEL, "text-gray-400")}> · ไม่จำเป็น</Text>;
};

const FormLabel = ({
  className,
  nativeID,
  children,
  optional = false,
  ...props
}: FormLabelProps) => {
  return (
    <Label nativeID={nativeID} className={cn(className)} {...props}>
      {children}
      {optional && <FormOptionalText />}
    </Label>
  );
};

const FormDescription = ({ className, children, ...props }: TextProps) => {
  return (
    <Text
      className={cn("text-sm text-muted-foreground", LABEL, className)}
      {...props}
    >
      {children}
    </Text>
  );
};
FormDescription.displayName = "FormDescription";

interface FormMessageProps {
  className?: string;
  children?: TextProps["children"];
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const FormMessage = ({
  className,
  children,
  errorMessage,
  ...props
}: FormMessageProps) => {
  const body = errorMessage ? String(errorMessage) : children;

  if (!body) {
    return null;
  }

  return (
    <View
      className={cn(
        "rounded-xl bg-red-300/40 px-3 py-1 self-start flex flex-row items-center gap-2",
        className
      )}
    >
      <CircleAlert size={18} color={colors.red[400]} strokeWidth={2.2} />
      <Text
        className={cn("text-sm font-medium text-destructive", LABEL)}
        {...props}
      >
        {body}
      </Text>
    </View>
  );
};
FormMessage.displayName = "FormMessage";

const FormItem = ({ className, children, ...props }: ViewProps) => {
  return (
    <View className={cn("flex flex-col gap-1", className)}>{children}</View>
  );
};
FormItem.displayName = "FormItem";

const Form = ({ className, children, ...props }: ViewProps) => {
  const handleOutsidePress = () => {
    Keyboard.dismiss(); // Dismiss the keyboard
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};
Form.displayName = "Form";

Form.FormOptionalText = FormOptionalText;
export { Form, FormLabel, FormDescription, FormMessage, FormItem };
