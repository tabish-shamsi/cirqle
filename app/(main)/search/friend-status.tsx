"use client";

import {
  cancelFriendRequest,
  removeFriend,
  sendFriendRequest,
  updateFriendStatus,
} from "@/actions/friends";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FriendStatus({
  friendStatus: initial,
  requestor,
  userId,
  friendId,
}: {
  friendStatus: "pending" | "accepted" | null;
  requestor: string | null;
  friendId: string;
  userId: string;
}) {
  const [friendStatus, setFriendStatus] = useState(initial);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  async function cancelRequest() {
    setLoading(true);
    const res = await cancelFriendRequest(userId);

    if (res.success) {
      toast.message(res.message);
      setFriendStatus(null);
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  async function acceptRequest() {
    setLoading(true);
    const res = await updateFriendStatus(
      userId,
      "requestor",
      "accept-request",
      friendId,
    );

    if (res.success) {
      toast.message(res.message);
      setFriendStatus("accepted");
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  async function declineRequest() {
    setLoading(true);
    const res = await updateFriendStatus(
      userId,
      "requestor",
      "decline-request",
      friendId,
    );

    if (res.success) {
      toast.message(res.message);
      setFriendStatus(null);
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  async function sendRequest() {
    setLoading(true);
    const res = await sendFriendRequest(userId);

    if (res.success) {
      toast.message(res.message);
      setFriendStatus("pending");
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  async function remove() {
    setLoading(true);
    const res = await removeFriend(userId);

    if (res.success) {
      toast.message(res.message);
      setFriendStatus(null);
    } else {
      toast.error(res.error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <Button disabled={loading} variant="outline">
        <Loader2 className="animate-spin" />
      </Button>
    );
  }

  switch (friendStatus) {
    case "accepted":
      return (
        <Button onClick={remove} variant="outline">
          Remove
        </Button>
      );

    case "pending":
      if (requestor === user?.id) {
        return (
          <Button onClick={cancelRequest} variant="outline">
            Cancel Request
          </Button>
        );
      } else {
        return (
          <div className="flex items-center justify-center gap-2">
            <Button onClick={acceptRequest} variant="outline">
              Accept
            </Button>
            <Button onClick={declineRequest} variant="outline">
              Decline
            </Button>
          </div>
        );
      }

    default:
      return (
        <Button onClick={sendRequest} variant="outline">
          Add Friend
        </Button>
      );
  }
}
