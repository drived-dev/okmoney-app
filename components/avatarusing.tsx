import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";

export function Avatarusing({ url }) {
  return (
    <Avatar alt="Zach Nugent's Avatar" className="flex flex-row gap-20">
      <AvatarImage source={{ uri: url }} />
      <Text> 1234 </Text>
    </Avatar>
  );
}
