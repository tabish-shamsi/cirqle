import { friends } from "@/lib/temporary-mock-data";
import { Button } from "@/components/ui/button";
import FriendCard from "@/components/friends/friend-card";

export default function Friends() {
  return friends.friends.map((user) => (
    <FriendCard
      key={user.id}
      friend={user}
      actions={
        <>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Remove
            </Button>
          </div>
        </>
      }
    />
  ));
}
