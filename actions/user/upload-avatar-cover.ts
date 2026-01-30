"use server"

import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import Media from "@/models/Media"
import Post from "@/models/Post"
import Profile from "@/models/Profile"
import User from "@/models/User"

export default async function createAvatarCoverPost({ type, mediaId, userId }: { type: "avatar" | "cover", mediaId: string, userId: string }) {
    try {
        const { id } = await checkAuth()
        if (id !== userId) {
            return { error: "You can only edit your own profile" }
        }

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
        await Media.findByIdAndUpdate(mediaId, { isUsed: true })
        return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded.` }
    } catch (error) {
        console.error(error)
        return { error: `Something went wrong while uploading ${type}` }
    }
}