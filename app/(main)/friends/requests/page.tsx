import { friendRequests } from "@/lib/temporary-mock-data";
import FriendCard from "@/components/friends/friend-card";
import { Button } from "@/components/ui/button";

export default function FriendRequests() {
  return friendRequests.map((request) => (
    <FriendCard
      key={request.id}
      friend={request}
      actions={
        <div className="flex gap-2 w-full">
          <Button className="flex-1" size="sm">
            Confirm
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Delete
          </Button>
        </div>
      }
    />
  ));
}
