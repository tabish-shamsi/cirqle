import { friendRequests } from "@/lib/temporary-mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function FriendSuggestions() {
  return (
    <Card className="pt-4 pb-6 gap-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Friend Suggestions</CardTitle>
          <Link href="/friends">
            <Button variant="link" className="p-0">
              See All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 border-t pt-6 px-4">
        {friendRequests.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between bg-secondary p-4 rounded-md">
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
                  {Math.floor(Math.random() * 90) + 10} Mutual Friends
                </p>
              </div>
            </div>

            <Button className="rounded-full" variant="outline" size="icon" ><Plus /></Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
