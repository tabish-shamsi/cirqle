"use client"

import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { updateFriendStatus } from "@/actions/friends";
import useAuth from "@/hooks/useAuth";
import { FriendType } from "@/types/Friend";
import { toast } from "sonner";

export default function RemoveFriend({ friendId, friendType }: { friendId: string, friendType: FriendType }) {
    const [loading, setLoading] = useState(false)
    const { user } = useAuth()
    const router = useRouter()

    const handleRemove = async () => {
        setLoading(true)

        const res = await updateFriendStatus(user.id, friendType, "remove", friendId)
        if (res.error) {
            toast.error(res.error)
            return
        }

        toast.success(res.message)
        router.refresh()
    }

    return (
        <div className="flex gap-2">
            <Button onClick={handleRemove} variant="outline" size="sm">
                {loading ? "Removing..." : "Remove"}
            </Button>
        </div>
    )
}