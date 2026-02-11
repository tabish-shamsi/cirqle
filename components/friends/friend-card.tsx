import { getUserInitials } from "@/utils/getUserInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import avatarUrl from "@/utils/avatarUrl";
import IUser from "@/types/User";
import Link from "next/link";

export default function FriendCard({
  friend,
  actions,
}: {
  friend: IUser;
  actions: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarUrl(friend.avatar?.url!)} />
          <AvatarFallback>{getUserInitials(friend.name)}</AvatarFallback>
        </Avatar>

        <Link href={`/u/${friend.username}`} className="text-center">
          <p className="text-lg font-semibold leading-none">{friend.name}</p>
          <p className="text-sm text-muted-foreground">
            @{friend.username}
          </p>
        </Link>
        {actions}
      </CardContent>
    </Card>
  );
}
