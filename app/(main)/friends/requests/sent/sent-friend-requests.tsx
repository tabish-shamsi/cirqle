import FriendCard from "@/components/friends/friend-card"; 
import { getSentFriendRequests } from "@/data/friend";
import IUser from "@/types/User";
import CancelRequestButton from "./cancel-request-button";

export default async function SentFriendRequests() {
  const requests = await getSentFriendRequests();
  
  if (requests.length > 0) {
    return requests.map((friend: IUser) => (
      <FriendCard
        friend={friend}
        key={friend._id}
        actions={<CancelRequestButton friendId={friend._id} />}
      />
    ));
  } else {
    return (
      <p className="text-sm text-muted-foreground">
        You haven't sent any requests
      </p>
    );
  }
}
