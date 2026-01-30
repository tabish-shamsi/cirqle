"use client"

import deleteMedia from "@/actions/media/delete-media";
import createAvatarCoverPost from "@/actions/user/upload-avatar-cover";
import useAuth from "@/hooks/useAuth";
import IMedia from "@/types/Media";
import uploadMedia from "@/utils/uplaod-media";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";

interface Props {
    cover: IMedia;
    name: string
    userId: string
}

type PreviewType = { url: string; status: "pending" | "error" | "success" } | null

export default function UploadCover({ cover, name, userId }: Props) {
    const { user } = useAuth()
    const pathname = usePathname()
    const [preview, setPreview] = useState<PreviewType>(cover ? { url: cover.url, status: "success", } : null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    async function handleCoverUpload(e: ChangeEvent<HTMLInputElement>) {
        if (pathname !== "/profile") {
            return
        }

        const files = e.target.files
        if (!files || files.length <= 0) {
            toast.error("Select an image to upload")
            return
        }

        const file = files[0]
        setPreview({ url: URL.createObjectURL(file), status: "pending" })

        const media = await uploadMedia(file)
        if (media?.error || !media?.fileId) {
            toast.error(media?.error ?? "Something went wrong, please try again later")
            setPreview(preview && { ...preview, status: "error" })
            return
        }


        setPreview({ url: media.url, status: "success" })

        const post = await createAvatarCoverPost({ mediaId: media.fileId, type: "cover", userId })
        if (post.error) {
            toast.error(post.error)
            await deleteMedia(media.fileId)
            return
        }

        toast.success(post.message)
    }

    const isOwner = userId === user?.id

    return (
        <div className="h-60.5 w-full bg-gray-200 relative flex items-center justify-center">
            {!preview && <p className="text-xl text-sidebar-ring select-none">No Cover Photo Uploaded</p>}
            {
                preview && (
                    <Image
                        width={960}
                        height={242}
                        src={preview?.url}
                        alt={`${name} cover`}
                        className="w-full h-full object-cover"
                    />
                )
            }

            {
                preview?.status === "pending" && (
                    <>
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Loader2 className="animate-spin text-white" />
                        </div>
                    </>
                )
            }

            {
                preview?.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center text-white">
                        Failed
                    </div>
                )
            }

            {isOwner && (
                <div onClick={() => fileInputRef.current?.click()} className="absolute top-0 left-0 w-full h-full flex z-1">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleCoverUpload} className="hidden" />
                </div>
            )}
        </div>
    )
}