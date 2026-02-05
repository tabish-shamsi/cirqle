"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import imagekit from "@/lib/imagekit";
import Media from "@/models/Media";
import Post from "@/models/Post";
import IMedia from "@/types/Media";
import { revalidatePath } from "next/cache";

export default async function deletePost(postId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const post = await Post.findById(postId)
      .select("author media")
      .populate({ path: "media", select: "fileId" });
    if (post.author.toString() !== id) {
      return { error: "Only the owner of this post can delte it" };
    }

    if (post.media && post.media.length > 0) {
      await Promise.all(
        post.media.map(async (m: IMedia) => {
          await imagekit.files.delete(m.fileId.toString());
          await Media.findByIdAndDelete(m._id);
        }),
      );
    }

    await Post.findByIdAndDelete(postId);
    
    revalidatePath("/profile");

    return { success: true, message: "Post deleted" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while deleting post." };
  }
}
