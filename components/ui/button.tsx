import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Pressable } from "react-native";
import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { BUTTON } from "~/constants/Typography";
import { LinearGradient } from "expo-linear-gradient";

const buttonVariants = cva(
  "group flex items-center justify-center rounded-2xl web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary web:hover:opacity-90 active:opacity-90",
        destructive: "bg-destructive web:hover:opacity-90 active:opacity-90",
        outline:
          "border border-gray-400 bg-transparent web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        secondary: "bg-secondary web:hover:opacity-80 active:opacity-80",
        ghost:
          "web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent bg-gray-200",
        link: "web:underline-offset-4 web:hover:underline web:focus:underline ",
        outline_white:
          "border border-white bg-transparent web:hover:bg-accent web:hover:text-accent-foreground active:bg-accent",
        green: "bg-[#E7F7F6] web:hover:opacity-90 active:opacity-90",
        gradient:
          "native:gradient-button web:bg-gradient-to-r web:from-[#F6A971] web:via-[#F08238] web:to-[#B04747] web:bg-clip-padding web:text-white web:hover:opacity-90 active:opacity-90", // Add a new mobile variant for native platforms
      },
      size: {
        default: "h-10 px-4 py-2 native:h-12 native:px-5 native:py-3",
        premium: "h-10 px-4 py-2 native:h-12 native:px-2 native:py-3",
        sm: "h-9 rounded-2xl px-3",
        lg: "h-11 rounded-2xl px-8 native:h-14",
        xl: "h-14 rounded-2xl px-10",
        icon: "h-10 w-10",
        "icon-lg": "h-14 w-14",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva(
  "web:whitespace-nowrap text-sm native:text-base font-medium text-foreground web:transition-colors",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-destructive-foreground",
        outline: "group-active:text-accent-foreground",
        secondary:
          "text-secondary-foreground group-active:text-secondary-foreground",
        ghost: "group-active:text-accent-foreground",
        link: "text-primary group-active:underline",
        outline_white: "group-active:text-white",
        green: "group-active:text-black",
        gradient: "group-active:text-white",
      },
      size: {
        default: "",
        premium: "",
        sm: "",
        lg: "native:text-lg",
        xl: "",
        icon: "",
        "icon-lg": "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TextClassContext.Provider
      value={cn(
        BUTTON,
        props.disabled && "web:pointer-events-none",
        buttonTextVariants({ variant, size })
      )}
    >
      <Pressable
        className={cn(
          props.disabled && "opacity-50 web:pointer-events-none",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
