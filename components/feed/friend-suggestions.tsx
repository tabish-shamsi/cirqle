import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/utils/getUserInitials";
import SuggestionButton from "./suggestion-button";
import IUser from "@/types/User";
import { getFriendSuggestions } from "@/data/friend";

type Suggestion = IUser & {
  mutualFriends: number;
};

export default async function FriendSuggestions() {
  const suggestsions = await getFriendSuggestions();
  console.log(suggestsions);

  if (suggestsions.length > 0) {
    return suggestsions.map((friend: Suggestion) => (
      <div
        key={friend._id}
        className="flex items-center justify-between bg-secondary p-4 rounded-md"
      >
        <div className="flex items-center gap-2">
          <Avatar className="w-11 h-11">
            <AvatarImage src={`${friend.avatar?.url}?tr=w-100,h-100`} />
            <AvatarFallback>{getUserInitials(friend.name)}</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-lg font-medium leading-none">{friend.name}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {friend.mutualFriends} Mutual Friends
            </p>
          </div>
        </div>

        <SuggestionButton friendId={friend._id} />
      </div>
    ));
  } else {
    return (
      <p className="text-sm text-muted-foreground">No friend suggestions</p>
    );
  }
}
