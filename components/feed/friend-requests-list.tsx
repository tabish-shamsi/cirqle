"use client"

import { CircleMinus, Ellipsis, UserCheck, X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RequestType, updateFriendStatus } from "@/actions/friends"
import useAuth from "@/hooks/useAuth"
import IFriend from "@/types/Friend"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { getUserInitials } from "@/utils/getUserInitials"
import { useState } from "react"
import { toast } from "sonner"

export default function FriendRequests({ friendRequests: initialFriendRequests }: { friendRequests: IFriend[] }) {
    const [friendRequests, setFriendRequests] = useState<IFriend[]>(initialFriendRequests)

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
            setFriendRequests(remainingRequests)
        }
    }
    if (friendRequests.length === 0) {
        return <p className="text-sm text-muted-foreground">No Requests</p>
    }

    return friendRequests.map((friend: IFriend) => (
        <div key={friend._id.toString()} className="space-y-2">
            <div className="flex items-center gap-2 relative">
                <Avatar className="w-11 h-11">
                    <AvatarImage src={friend.requestor?.avatar?.url} />
                    <AvatarFallback>{getUserInitials(friend.requestor?.name)}</AvatarFallback>
                </Avatar>

                <div>
                    <p className="text-lg font-medium leading-none">
                        {friend.requestor?.name}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                        @{friend.requestor?.username}
                    </p>
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="rounded-full absolute top-0 right-0" ><Ellipsis /></Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="max-w-min space-y-2">
                        <Button
                            onClick={() => handleRequests("accept-request", friend._id.toString())}
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start">
                            <UserCheck className="text-green-700" />
                            Accept Request
                        </Button>
                        <Button
                            onClick={() => handleRequests("decline-request", friend._id.toString())}
                            variant="ghost" size="sm" className="w-full justify-start">
                            <X className="text-red-500" />
                            Decline Request
                        </Button>


                        <Button variant="ghost" size="sm" className="w-full justify-start"><CircleMinus className="text-destructive" /> Block</Button>
                    </PopoverContent>
                </Popover>
            </div>
        </div >
    ))
}