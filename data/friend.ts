import Friend from "@/models/Friend";
import checkAuth from "./check-auth";
import { FriendType } from "@/types/Friend";

export async function getFriendStatus(userId: string) {
    const { id } = await checkAuth()
    if (userId === id) return null // it means we are on the /profile page or the we are seeing our own profile

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

    return { friendType, friend: JSON.parse(JSON.stringify(friend)) }
}