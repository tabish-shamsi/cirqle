import FriendCard from "@/components/friends/friend-card";
import { getAdvFriendSuggestions } from "@/data/friend";
import SendRequestButton from "./send-request-button";
import IUser from "@/types/User";

export default async function FriendSuggestions() {
  const suggestions = await getAdvFriendSuggestions();

  if (suggestions.length > 0) {
    return suggestions.map((friend: IUser) => (
      <FriendCard
        key={friend._id}
        friend={friend}
        actions={<SendRequestButton friendId={friend._id} />}
      />
    ));
  } else {
    return (
      <p className="text-sm text-muted-foreground">No friend suggestions</p>
    );
  }
}
