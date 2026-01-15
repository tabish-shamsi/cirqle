import { getUserInitials } from "@/utils/getUserInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

export default function FriendCard({ friend, actions }: any) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={friend.avatar} />
          <AvatarFallback>{getUserInitials(friend.name)}</AvatarFallback>
        </Avatar>

        <div className="text-center ">
          <p className="text-lg font-medium leading-none">{friend.name}</p>
          <p className="text-sm text-muted-foreground capitalize">
            @{friend.username}
          </p>
        </div>
        {actions}
      </CardContent>
    </Card>
  );
}
