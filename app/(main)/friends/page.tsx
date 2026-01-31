import FriendCard from "@/components/friends/friend-card";
import { getAcceptedFriends } from "@/data/friend";
import IUser from "@/types/User";
import { FriendType } from "@/types/Friend";
import RemoveFriend from "@/components/friends/remove-friend";

export default async function Friends() {
  const friends = await getAcceptedFriends()
  if (friends.length > 0) {
    return friends.map(({ friendId, user, friendType }: { friendId: string, user: IUser, friendType: FriendType }) => (
      <FriendCard
        key={friendId}
        friend={user}
        actions={<RemoveFriend friendId={friendId} friendType={friendType} />}
      />
    ));
  } else {
    return <p className="text-muted-foreground">You don't have any friends</p>
  }
}
