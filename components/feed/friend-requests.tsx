import { friendRequests } from "@/lib/temporary-mock-data";
import {
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FriendRequestsCard() {
  return (
    <Card className="pt-4 pb-6 gap-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Friend Requests</CardTitle>
          <Link href="/friends">
            <Button variant="link" className="p-0">
              See All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 border-t pt-6">
        {friendRequests.map((friend) => (
          <div key={friend.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-11 h-11">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-lg font-medium leading-none">
                  {friend.name}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  @{friend.username}
                </p>
              </div>
            </div>

            <Button className="mr-2 mb-0 rounded-full">Confirm</Button>
            <Button variant="secondary" className="rounded-full">
              Delete
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
