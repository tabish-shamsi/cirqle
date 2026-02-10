import FriendCard from "@/components/friends/friend-card";
import { getAcceptedFriends } from "@/data/friend";
import IUser from "@/types/User";
import RemoveFriend from "@/components/friends/remove-friend";

export default async function Friends() {
  const friends = await getAcceptedFriends();

  if (friends.length > 0) {
    return friends.map((user: IUser) => (
      <FriendCard
        key={user._id}
        friend={user}
        actions={<RemoveFriend userId={user._id} />}
      />
    ));
  } else {
    return <p className="text-muted-foreground">You don't have any friends</p>;
  }
}
