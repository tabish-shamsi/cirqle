import FriendRequestsList from "@/components/friends/friend-requests";
import checkAuth from "@/data/check-auth";
import { getFriendRequests } from "@/data/friend";

export default async function FriendRequests() {
  await checkAuth();
  const friendRequests = await getFriendRequests();

  if (friendRequests.length > 0) {
    return <FriendRequestsList friendRequests={friendRequests} />;
  } else {
    return (
      <p className="text-sm text-muted-foreground">
        You haven't sent any requests
      </p>
    );
  }
}
