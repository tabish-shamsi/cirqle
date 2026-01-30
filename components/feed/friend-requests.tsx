import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { getFriendRequests } from "@/data/friend";
import IFriend from "@/types/Friend";
import { getUserInitials } from "@/utils/getUserInitials"; 
import FriendRequestsActions from "./friend-request-actions";

export default async function FriendRequestsCard() {
  const friendRequests = await getFriendRequests()

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
        {friendRequests.length > 0 ? (
          friendRequests.map(({ _id: friendId, requestor }: IFriend) => (
            <div key={friendId.toString()} className="space-y-2">
              <div className="flex items-center gap-2 relative">
                <Avatar className="w-11 h-11">
                  <AvatarImage src={requestor?.avatar?.url} />
                  <AvatarFallback>{getUserInitials(requestor?.name)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-lg font-medium leading-none">
                    {requestor?.name}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    @{requestor?.username}
                  </p>
                </div>

                <FriendRequestsActions friendId={friendId.toString()} />
 
              </div>
            </div>
          ))
        ) : ("No requests found")}
      </CardContent>
    </Card>
  );
}
