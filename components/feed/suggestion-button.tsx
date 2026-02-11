"use client";

import { Loader2, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { sendFriendRequest } from "@/actions/friends";
import { toast } from "sonner";

export default function SuggestionButton({ friendId }: { friendId: string }) {
  const [loading, setLoading] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const sendRequest = async () => {
    setLoading(true);
    const res = await sendFriendRequest(friendId);
    if (!res.success) {
      toast.error(res.error);
      setLoading(false);
      return;
    }

    toast.message(res.message);
    setLoading(false);
    setIsRequestSent((prev) => !prev);
  };

  return (
    <Button
      onClick={sendRequest}
      className="rounded-full"
      variant="outline"
      size="icon"
    >
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : isRequestSent ? (
        <X />
      ) : (
        <Plus />
      )}
    </Button>
  );
}
