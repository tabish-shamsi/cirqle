import FriendRequestsList from "@/components/friends/friend-requests";
import checkAuth from "@/data/check-auth";
import { getFriendRequests } from "@/data/friend";

export default async function FriendRequests() {
  await checkAuth()
  const friendRequests = await getFriendRequests()

  return <FriendRequestsList friendRequests={friendRequests} />
}
