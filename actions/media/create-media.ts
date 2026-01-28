import checkAuth from "@/data/check-auth"
import db from "@/lib/db"
import Media from "@/models/Media";

export default async function createMedia(media: { type: string; url: string; imagekitId: string }) {
    try {
        const { id } = await checkAuth()
        await db()

        const createdMedia = await Media.create({ ...media, authorId: id })

        return { success: true, message: "Media files uploaded", mediaId: createdMedia._id }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while uploading media" }
    }
}