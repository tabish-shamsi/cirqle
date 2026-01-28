"use server"

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Media from "@/models/Media";
import Post from "@/models/Post";

type Props = {
    content: string
    media: { imagekitId: string; url: string, type: string }[]
}

export default async function createPost({ content, media }: Props) {
    if (media.length === 0) {
        return { error: "Atleast one image or video is required" }
    }

    try {
        const { id } = await checkAuth()
        await db()

        const newMedia = async () => {
            return media.map(async ({ imagekitId, url, type }) => {
                try {
                    const newMedia = await Media.create({ imagekitId, url, type, authorId: id })
                    return newMedia._id
                } catch (error) {
                    console.error(error)
                    return { error: "Something went wrong while uploading media files" }
                }
            })
        }
        await Post.create({ content, media: newMedia, authorId: id })
        return { success: true, message: "Post created" }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while creating post" }
    }
}