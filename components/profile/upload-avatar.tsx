"use client"

import createPost from "@/actions/post/create-post";
import useAuth from "@/hooks/useAuth";
import IMedia from "@/types/Media";
import uploadMedia from "@/utils/uplaod-media";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/utils/getUserInitials";

export default function UploadAvatar({ avatar, name }: { avatar?: IMedia, name: string }) {
    const { update, user, isLoading } = useAuth()
    const pathname = usePathname()

    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState<{ url: string; status: "pending" | "error" | "success" } | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    async function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>) {
        if (pathname !== "profile") {
            return
        }

        setLoading(true)
        const files = e.target.files
        if (!files || files.length <= 0) {
            toast.error("Select an image to upload")
            return
        }

        const file = files[0]

        const media = await uploadMedia(file)
        if (media?.error || !media?.fileId) {
            toast.error(media?.error ?? "Something went wrong, please try again later")
            return
        }

        await update({ avatar: media.url })

        const post = await createPost({ content: "Uploaded a new avatar", postType: "image", media: [media?.fileId] })
        if (post.error) {
            toast.error(post.error)
            return
        }

        setLoading(false)
        router.refresh()
    }

    return (
        <>
            <div className="w-30 h-30 border-4 border-card rounded-full absolute -top-22 md:-top-6 left-1/2 -translate-x-1/2 md:left-20 overflow-hidden">
                {
                    isLoading ? (<Skeleton className="w-full h-full rounded-full" />) : (
                        <Avatar className="w-full h-full text-3xl font-bold">
                            <AvatarImage src={avatar?.url} className="w-full h-full object-cover" />
                            <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
                        </Avatar>
                    )
                }

                {user && (
                    <div onClick={() => fileInputRef.current?.click()} className="bg-none absolute top-0 left-0 rounded-full w-full h-full flex z-1">
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" />
                    </div>
                )}

            </div>
        </>
    )
}