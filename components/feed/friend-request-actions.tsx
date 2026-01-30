"use client"

import { CircleMinus, Ellipsis, UserCheck, X } from "lucide-react"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { RequestType, updateFriendStatus } from "@/actions/friends"
import { useRouter } from "next/navigation"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"

export default function FriendRequestsActions({ friendId }: { friendId: string }) {
    const router = useRouter()
    const { user } = useAuth()

    const handleRequests = async (requestType: RequestType) => {
        const res = await updateFriendStatus(user.id, "acceptor", requestType, friendId)
        if (res.error) {
            toast.error(res.error)
            return
        }

        toast.success(res.message)
        router.refresh()
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="rounded-full absolute top-0 right-0" ><Ellipsis /></Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" className="max-w-min space-y-2">
                <Button onClick={() => handleRequests("accept-request")} variant="ghost" size="sm" className="w-full justify-start"><UserCheck className="text-green-700" /> Accept Request</Button>
                <Button onClick={() => handleRequests("decline-request")} variant="ghost" size="sm" className="w-full justify-start"><X className="text-red-500" /> Decline Request</Button>
                <Button variant="ghost" size="sm" className="w-full justify-start"><CircleMinus className="text-destructive" /> Block</Button>
            </PopoverContent>
        </Popover>
    )
}