import { Suspense } from "react";
import SentFriendRequests from "./sent-friend-requests"; 
import { FriendCardSkeleton } from "@/components/skeletons/friend-card-skeleton";

export default function SentFriendRequestsPage() {
  return (
    <Suspense fallback={<FriendCardSkeleton />}>
      <SentFriendRequests />
    </Suspense>
  );
}
