import { FriendCardSkeleton } from "@/components/skeletons/friend-card-skeleton";
import { Suspense } from "react";
import FriendRequests from "./friend-requests";

export default function FriendRequestsPage() {
  return (
    <Suspense fallback={<FriendCardSkeleton />}>
      <FriendRequests />
    </Suspense>
  );
}
