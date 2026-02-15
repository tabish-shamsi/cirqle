"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Friend from "@/models/Friend";
import User from "@/models/User";
import { FriendType } from "@/types/Friend";
import { revalidatePath } from "next/cache";

export type RequestType =
  | "send-request"
  | "accept-request"
  | "decline-request"
  | "remove"
  | "cancel-request";

export async function updateFriendStatus(
  userId: string,
  friendType: FriendType,
  requestType: RequestType,
  friendId?: string,
) {
  // userId id of the user whose profile we are seeing
  const { id } = await checkAuth();
  await db();

  let friend;
  if (friendId) {
    friend = await Friend.findById(friendId);
    if (!friend) return { error: "Friend not found" };
  }

  switch (requestType) {
    case "send-request":
      if (userId === id) return { error: "You cannot add yourself as friend" };
      const newFriend = await Friend.create({
        acceptor: userId,
        requestor: id,
        status: "pending",
      });
      return {
        success: true,
        message: "Friend request sent",
        friend: JSON.parse(JSON.stringify(newFriend)),
        friendType: "acceptor",
      };

    case "accept-request":
      if (id !== friend.acceptor.toString())
        return { error: "Invalid request type" };
      const updatedFriend = await Friend.findByIdAndUpdate(
        friendId,
        { status: "accepted" },
        { new: true },
      );

      await User.findByIdAndUpdate(id, {
        $push: { friends: friend.requestor },
      });
      await User.findByIdAndUpdate(friend.requestor, {
        $push: { friends: id },
      });
      return {
        success: true,
        message: "Friend request accepted",
        friend: JSON.parse(JSON.stringify(updatedFriend)),
        friendType,
      };

    case "decline-request":
      if (id !== friend.acceptor.toString())
        return { error: "Invalid request type" };
      await Friend.findByIdAndDelete(friendId);
      return {
        success: true,
        message: "Declined friend request",
        friend: {},
        friendType: "notFriend",
      };

    case "remove":
      await Friend.findByIdAndDelete(friendId);
      await User.findByIdAndUpdate(friend.acceptor, {
        $pull: { friends: friend.requestor },
      });

      await User.findByIdAndUpdate(friend.requestor, {
        $pull: { friends: friend.acceptor },
      });

      return {
        success: true,
        message: "Removed friend",
        friend: {},
        friendType: "notFriend",
      };

    case "cancel-request":
      if (id !== friend.requestor.toString())
        return { error: "Invalid request type" };
      await Friend.findByIdAndDelete(friendId);
      return {
        success: true,
        message: "Friend request canceld",
        friend: {},
        friendType: "notFriend",
      };
  }
}

export async function removeFriend(targetFriendId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const friend = await Friend.findOne({
      $or: [
        { requestor: id, acceptor: targetFriendId },
        { requestor: targetFriendId, acceptor: id },
      ],
    }).lean();
    if (!friend) return { error: "Friend not found" };

    await Friend.findByIdAndDelete(friend._id);
    await User.findByIdAndUpdate(id, { $pull: { friends: targetFriendId } });
    await User.findByIdAndUpdate(targetFriendId, { $pull: { friends: id } });

    revalidatePath("/friends");

    return { success: true, message: "Friend Removed" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while removing friend" };
  }
}

export async function sendFriendRequest(friendId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const friend = await Friend.findOne({
      $or: [
        { request: id, acceptor: friendId },
        { acceptor: id, requestor: friendId },
      ],
    });

    if (friend) {
      if (friend.status === "accepted") {
        return { error: "Invalid request" };
      }

      await Friend.findOneAndDelete({
        $or: [
          { request: id, acceptor: friendId },
          { acceptor: id, requestor: friendId },
        ],
      });
      return { success: true, message: "Request canceled" };
    } else {
      await Friend.create({
        acceptor: friendId,
        requestor: id,
      });

      revalidatePath("/friends/requests");
      return { success: true, message: "Request sent" };
    }
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}

export async function cancelFriendRequest(friendId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const friend = await Friend.findOne({ requestor: id, acceptor: friendId });

    if (
      !friend ||
      friend.requestor.toString() !== id ||
      friend.acceptor.toString() !== friendId
    ) {
      return { error: "Unexpected error" };
    }

    await Friend.findOneAndDelete({ requestor: id, acceptor: friendId });
    revalidatePath("/friends/requests/sent");
    return { success: true, message: "Request canceled" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
