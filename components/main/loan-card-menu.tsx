import * as React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/text";
import { Icon } from "../icon";
import colors from "tailwindcss/colors";
import { PARAGRAPH } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { Trash } from "lucide-react-native";

const menuLinks = [
  { name: "ดูข้อมูลเพิ่มเติม", route: "/" },
  {
    name: "ดูประวัติ",
    route: "/",
  },
  {
    name: "แก้ไขข้อมูล",
    route: "/",
  },
  {
    name: "ดูข้อมูลเพิ่มเติม",
  },
];

const deleteLoanRoute = "/";
export const LoanCardMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <Icon name="Ellipsis" size={24} color={colors.gray[500]} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 native:w-72">
        <DropdownMenuLabel className="text-gray-500">
          จัดการลูกหนี้
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuLinks.map((item, index) => (
          // TODO: map with link
          <DropdownMenuItem key={index}>
            <Text className={cn(PARAGRAPH)}>{item.name}</Text>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row justify-between items-center">
          <Text className={cn(PARAGRAPH, "text-destructive")}>ลบลูกหนี้</Text>
          <Trash size={20} color={colors.red[400]}></Trash>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
