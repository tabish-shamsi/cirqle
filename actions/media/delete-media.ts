"use server"

import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import imagekit from "@/lib/imagekit"
import Media from "@/models/Media"

export default async function deleteMedia(mediaId: string) {
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

        await Media.findOneAndDelete({ _id: mediaId, authorId: id })

        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while deleting media" }
    }
}