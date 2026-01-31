import Friend from "@/models/Friend";
import checkAuth from "./check-auth";
import { FriendType } from "@/types/Friend";
import db from "@/lib/db";
import toJSON from "@/utils/toJSON";
import IUser from "@/types/User";
import { createToJSONSchemaMethod } from "zod/v4/core";

export async function getFriendStatus(userId: string) {
    const { id } = await checkAuth()
    if (userId === id) return null // it means we are on the /profile page or the we are seeing our own profile

    await db()
    const friend = await Friend.findOne({
        $or: [
            { requestor: id, acceptor: userId },
            { requestor: userId, acceptor: id }
        ]
    }).lean()

    if (!friend) return { friendType: "notFriend" as FriendType, friend: null } // seeing a profile which is not a friend

    let friendType: FriendType;
    if (friend.requestor.toString() === id) {
        friendType = "acceptor"; // the user received the request
    } else {
        friendType = "requestor"; // the user sent the request
    }

    return { friendType, friend: toJSON(friend) }
}

export async function getFriendRequests() {
    const { id } = await checkAuth()
    await db()

    const friend = 
        await Friend.find({ acceptor: id, status: "pending" })
        .populate({ path: "requestor", select: "name username avatar", populate: { path: "avatar", select: "url" } })
        
    if (!friend) return []

    return toJSON(friend)
}

export async function getAcceptedFriends() {
    const { id } = await checkAuth()
    await db()

    const friends =
        await Friend.find({ $or: [{ acceptor: id }, { requestor: id }] })
            .populate({ path: "requestor", select: "name username avatar", populate: { path: "avatar", select: "url" } })
            .populate({ path: "acceptor", select: "name username avatar", populate: { path: "avatar", select: "url" } })

    if (!friends || friends.length === 0) return []
    const users = friends.map(({ _id, requestor, acceptor }) => {
        if (requestor._id.toString() !== id) {
            return { friendId: _id, user: requestor, friendType: "requestor" }
        } else {
            return { friendId: _id, user: acceptor, friendType: "acceptor" }
        }
    })

    return toJSON(users)
}