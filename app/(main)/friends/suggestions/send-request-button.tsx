"use client";

import { sendFriendRequest } from "@/actions/friends";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function SendRequestButton({ friendId }: { friendId: string }) {
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    const res = await sendFriendRequest(friendId);
    if (res.error) {
      setLoading(false);
      toast.error(res.error);
      return;
    }

    toast.message(res.message);
    setLoading(false);
  };

  return (
    <Button onClick={sendRequest} variant="outline" size="sm">
      {loading ? "Sending..." : "Add Friend"}
    </Button>
  );
}
