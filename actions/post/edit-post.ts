"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Media from "@/models/Media";
import Post from "@/models/Post";
import { revalidatePath } from "next/cache";

type Props = {
  postId: string;
  content: string;
  media: string[];
  postType: "image" | "video";
};

export default async function editPost({
  postId,
  content,
  media,
  postType,
}: Props) {
  try {
    const { id } = await checkAuth();
    await db();

    const post = await Post.findById(postId);
    if (!post) {
      return { error: "Post not found" };
    }

    if (post.author.toString() !== id) {
      return { error: "Only the user who created this post can edit it" };
    }

    post.content = content;
    if (media.length > 0) post.media = media;
    post.postType = postType;

    media.map(async (m: string) => {
      await Media.findByIdAndUpdate(m, { isUsed: true });
    });

    await post.save();

    revalidatePath("/");
    revalidatePath("profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while editing post" };
  }
}
