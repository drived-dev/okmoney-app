import { Text, TextProps, View } from "react-native";
import React from "react";
import { Label } from "~/components/ui/label";
import { cn } from "~/lib/utils";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { LABEL } from "~/constants/Typography";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const FormLabel = Label;

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

interface FormMessgeProps {
  className?: string;
  children?: TextProps["children"];
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const FormMessage = ({
  className,
  children,
  errorMessage,
  ...props
}: FormMessgeProps) => {
  const body = errorMessage ? String(errorMessage) : children;

  if (!body) {
    return null;
  }

  return (
    <Text
      className={cn("text-sm font-medium text-destructive", LABEL, className)}
      {...props}
    >
      {body}
    </Text>
  );
};
FormMessage.displayName = "FormMessage";

const FormItem = ({ className, children, ...props }: ViewProps) => {
  return (
    <View className={cn("flex flex-col gap-1", className)}>{children}</View>
  );
};
FormItem.displayName = "FormItem";

export { FormLabel, FormDescription, FormMessage, FormItem };
