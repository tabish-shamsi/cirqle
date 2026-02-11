import { FriendCardSkeleton } from "@/components/skeletons/friend-card-skeleton";
import { Suspense } from "react";
import FriendSuggestions from "./friend-suggestions";

export default function FriendSuggestionsPage() {
  return (
    <Suspense fallback={<FriendCardSkeleton />}>
      <FriendSuggestions />
    </Suspense>
  );
}
