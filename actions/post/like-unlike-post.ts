"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Like from "@/models/Like";
import Post from "@/models/Post";

export default async function likeUnlikePost(postId: string) {
  try {
    if (!postId) return { error: "Post id is required" };

    const { id } = await checkAuth();
    await db();

    const post = await Post.findById(postId);

    if (!post) return { error: "Post not found" };

    const likeExist = await Like.findOne({ userId: id, postId }); 

    if (likeExist) {
      await Like.deleteOne({ postId, userId: id });
    } else {
      await Like.create({ userId: id, postId });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Somehting went wrong while liking post" };
  }
}
