"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Media from "@/models/Media";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

type Props = {
  content: string;
  media?: string[];
  postType: "image" | "video" | null;
};

export default async function createPost({ content, media, postType }: Props) {
  try {
    const { id } = await checkAuth();
    await db();
    const post = await Post.create({ content, media, author: id, postType });

    if (post.media && post.media.length > 0) {
      Promise.all(
        post.media.map(async (mediaId: string) => {
          await Media.findByIdAndUpdate(mediaId, { isUsed: true });
        }),
      );
    }

    revalidatePath("/")

    return {
      success: true,
      message: "Post created", 
      postId: post._id.toString()
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while creating post" };
  }
}
