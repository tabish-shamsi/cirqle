import FriendRequestsCard from "./friend-requests";
import FriendSuggestions from "./friend-suggestions";

export default function FeedSidebar() {
  return (
    <div className="w-1/3 space-y-4 hidden lg:block">
      <FriendRequestsCard />
      <FriendSuggestions />
    </div>
  );
}
