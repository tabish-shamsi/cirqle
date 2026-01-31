"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import IFriend from "@/types/Friend";
import FriendCard from "./friend-card";
import useAuth from "@/hooks/useAuth";
import { RequestType, updateFriendStatus } from "@/actions/friends";
import { toast } from "sonner";

export default function FriendRequestsList({ friendRequests }: { friendRequests: IFriend[] }) {
    const [requests, setRequests] = useState<IFriend[]>(friendRequests)

    const { user } = useAuth()

    const handleRequests = async (requestType: RequestType, friendId: string) => {
        const remainingRequests = friendRequests.filter(p => p._id.toString() !== friendId)
        const res = await updateFriendStatus(user.id, "acceptor", requestType, friendId)

        if (res.error) {
            toast.error(res.error)
            return
        }

        if (res.success) {
            toast.success(res.message)
            setRequests(remainingRequests)
        }
    }


    if (requests.length > 0) {
        return requests.map(({ _id, requestor }: IFriend) => (
            <FriendCard
                key={_id}
                friend={requestor}
                actions={
                    <div className="flex gap-2 w-full">
                        <Button
                            onClick={() => handleRequests("accept-request", _id.toString())}
                            className="flex-1" size="sm">
                            Confirm
                        </Button>
                        <Button
                            onClick={() => handleRequests("decline-request", _id.toString())}
                            variant="outline"
                            size="sm"
                            className="flex-1">
                            Delete
                        </Button>
                    </div>
                }
            />
        ))
    }
    else {
        return <p className="text-sm text-muted-foreground">No Requests</p>
    }
}