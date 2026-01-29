"use server"

import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import Post from "@/models/Post"
import Profile from "@/models/Profile"
import User from "@/models/User"

export default async function uploadAvatarCover({ type, mediaId }: { type: "avatar" | "cover", mediaId: string }) {
    try {
        const { id } = await checkAuth()
        await db()

        if (type === "avatar") {
            const user = await User.findByIdAndUpdate(id, { avatar: mediaId })
            if (!user) return { error: "User not found" }
        } else {
            const profile = await Profile.findOneAndUpdate({ userId: id }, { cover: mediaId })
            if (!profile) {
                await Profile.create({ cover: mediaId })
            }
        }

        await Post.create({ content: `Uploaded a new ${type} image.`, media: [mediaId], postType: "image", author: id })
        return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded.` }
    } catch (error) {
        console.error(error)
        return { error: `Something went wrong while uploading ${type}` }
    }
}