import FriendRequestsCard from "./friend-requests";
import FriendSuggestions from "./friend-suggestions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

export default function FeedSidebar() {
  return (
    <div className="w-1/3 space-y-4 hidden lg:block">
      <FriendRequestsCard />

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
          <FriendSuggestions />
        </CardContent>
      </Card>
    </div>
  );
}
