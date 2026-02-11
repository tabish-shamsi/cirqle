"use client"

import { cancelFriendRequest } from "@/actions/friends";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function CancelRequestButton({
  friendId,
}: {
  friendId: string;
}) {
  const [loading, setLoading] = useState(false);

  const cancelRequest = async () => {
    const res = await cancelFriendRequest(friendId);
    if (res.error) {
      setLoading(false);
      toast.error(res.error);
      return;
    }

    toast.message(res.message);
    setLoading(false);
  };

  return (
    <Button onClick={(cancelRequest)} variant="outline" size="sm">
      {loading ? "Cancelling..." : "Cancel Request"}
    </Button>
  );
}
