"use server"

import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import imagekit from "@/lib/imagekit"
import Media from "@/models/Media"
import Post from "@/models/Post"
import mongoose from "mongoose"

export default async function deleteMedia(mediaId: string, postId?: string) {
    try {
        const { id } = await checkAuth()
        await db()

        const media = await Media.findOne({ _id: mediaId, authorId: id })

        if (!media) {
            return { error: "Media not found" }
        }

        try {
            await imagekit.files.delete(media.fileId)
        } catch (error) {
            console.error(error)
            return { error: "Something went wrong while deleting media" }
        }

        if (postId) {
            const post = await Post.findById(postId)
            if (post.media && post.media > 0) {
                post.media = post.media.filter((p: mongoose.Types.ObjectId) => p.toString() !== mediaId)
                await post.save()
            }
        }

        await Media.findOneAndDelete({ _id: mediaId, authorId: id })

        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while deleting media" }
    }
}