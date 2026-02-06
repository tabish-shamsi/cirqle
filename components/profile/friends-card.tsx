import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getAcceptedFriends } from "@/data/friend";
import Link from "next/link";
import IUser from "@/types/User";
import { getUserInitials } from "@/utils/getUserInitials";
import avatarUrl from "@/utils/avatarUrl";

export default async function FriendsCard() {
  const friends = await getAcceptedFriends()

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Friends</CardTitle>
          <p className="text-sm text-muted-foreground">
            {friends.length} friends
          </p>
        </div>

        <Button variant="link" size="sm">
          <Link href="/friends">See all</Link>
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 content-center">
          {friends.length > 0 ? (
            friends.map(({ user }: { user: IUser }) => (
              <Link
                href={`/u/${user.username}`}
                key={user._id.toString()}
                className="flex flex-col items-center gap-2 text-center"
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarUrl(user?.avatar?.url ?? "")} alt={user.name} />
                  <AvatarFallback>
                    {getUserInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="text-sm">
                  <p className="font-medium leading-none">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">You don't have any friends</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
