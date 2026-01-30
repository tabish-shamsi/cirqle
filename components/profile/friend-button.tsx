"use client"

import IFriend, { FriendType } from "@/types/Friend"
import { Button } from "../ui/button"
import { User } from "lucide-react"
import { useState } from "react"
import { updateFriendStatus } from "@/actions/friends"
import { toast } from "sonner"

export default function FriendButton({ friend: initialFriend, friendType: initialFriendType, userId }: { friend: IFriend, friendType: FriendType, userId: string }) {
    const [friendType, setFriendType] = useState<FriendType>(initialFriendType)
    const [friend, setFriend] = useState(initialFriend)

    const notFriend = friendType === "notFriend"
    const acceptor = friend && friendType === "acceptor"
    const requestor = friend && friendType === "requestor"

    const pendingRequest = friend && friend?.status === "pending"
    const acceptedRequest = friend && friend?.status === "accepted"

    const handleUpdate = async () => {
        let res;
        if (notFriend) {
            res = await updateFriendStatus(userId, friendType, "send-request")
        }
        if (acceptor && pendingRequest) {
            res = await updateFriendStatus(userId, friendType, "cancel-request", friend._id.toString())
        }
        if (requestor && pendingRequest) {
            res = await updateFriendStatus(userId, friendType, "accept-request", friend._id.toString())
        }
        if (acceptedRequest) {
            res = await updateFriendStatus(userId, friendType, "remove", friend._id.toString())
        }

        if (res?.error) {
            toast.error(res.error)
            return
        }

        if (res?.success) {
            toast.success(res.message)
            if (res.friend) setFriend(res.friend)
            if (res.friendType) setFriendType(res?.friendType as FriendType)
        }
    }

    return (
        <Button onClick={handleUpdate} className="h-9 md:h-11">
            <User />
            {notFriend && "Add Friend"}
            {acceptor && pendingRequest && "Cancel Request"}
            {requestor && pendingRequest && "Accept"}
            {acceptedRequest && "Remove"}
        </Button>
    )
}