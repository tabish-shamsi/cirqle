import FriendCard from "@/components/friends/friend-card";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/lib/temporary-mock-data";

export default function FriendSuggestions() {
  return suggestions.map((request) => (
    <FriendCard
      key={request.id}
      friend={request}
      actions={<Button>Add Friend</Button>}
    />
  ));
}
