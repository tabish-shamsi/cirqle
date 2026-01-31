"use server"

import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import Friend from "@/models/Friend"
import { FriendType } from "@/types/Friend"

export type RequestType = "send-request" | "accept-request" | "decline-request" | "remove" | "cancel-request";

export async function updateFriendStatus(userId: string, friendType: FriendType, requestType: RequestType, friendId?: string) {
    // userId id of the user whose profile we are seeing
    const { id } = await checkAuth()
    await db()

    let friend
    if (friendId) {
        friend = await Friend.findById(friendId)
        if (!friend) return { error: "Friend not found" }
    }

    switch (requestType) {
        case "send-request":
            if (userId === id) return { error: "You cannot add yourself as friend" }
            const newFriend = await Friend.create({ acceptor: userId, requestor: id, status: "pending" })
            return { success: true, message: "Friend request sent", friend: JSON.parse(JSON.stringify(newFriend)), friendType: "acceptor" }

        case "accept-request":
            if (id !== friend.acceptor.toString()) return { error: "Invalid request type" }
            const updatedFriend = await Friend.findByIdAndUpdate(friendId, { status: "accepted" }, { new: true })
            return { success: true, message: "Friend request accepted", friend: JSON.parse(JSON.stringify(updatedFriend)), friendType }

        case "decline-request":
            if (id !== friend.acceptor.toString()) return { error: "Invalid request type" }
            await Friend.findByIdAndDelete(friendId)
            return { success: true, message: "Declined friend request", friend: {}, friendType: "notFriend" }

        case "remove":
            await Friend.findByIdAndDelete(friendId)
            return { success: true, message: "Removed friend", friend: {}, friendType: "notFriend" }

        case "cancel-request":
            if (id !== friend.requestor.toString()) return { error: "Invalid request type" }
            await Friend.findByIdAndDelete(friendId)
            return { success: true, message: "Friend request canceld", friend: {}, friendType: "notFriend" }
    }
}