import { friends } from "@/lib/temporary-mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function FriendsCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Friends</CardTitle>
          <p className="text-sm text-muted-foreground">
            {friends.total} friends
          </p>
        </div>

        <Button variant="ghost" size="sm">
          See all
        </Button>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {friends.friends.map((friend) => (
            <div
              key={friend.id}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={friend.avatar} alt={friend.name} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="text-sm">
                <p className="font-medium leading-none">{friend.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{friend.username}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
