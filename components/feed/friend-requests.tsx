import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getFriendRequests } from "@/data/friend";
import FriendRequests from "./friend-requests-list";

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
        <FriendRequests friendRequests={friendRequests} />
      </CardContent>
    </Card>
  );
}
