"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Comment from "@/models/Comment";
import Post from "@/models/Post";
import toJSON from "@/utils/toJSON";

export async function postComment(
  postId: string,
  comment: string,
  parentId?: string,
) {
  try {
    const { id } = await checkAuth();

    await db();

    const post = await Post.findById(postId);
    if (!post) return { error: "Post not found" };

    const newComment = await Comment.create({
      postId,
      author: id,
      comment,
      parentId,
    });

    const comment_ = await Comment.findById(newComment._id).populate({
      path: "author",
      select: "avatar name",
      populate: { path: "avatar", select: "url" },
    });

    return { success: true, comment: toJSON(comment_) };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while commenting" };
  }
}

export async function editComment(commentId: string, newComment: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const comment = await Comment.findById(commentId);
    if (!comment) return { error: "Comment not found" };

    if (comment.author.toString() !== id)
      return { error: "Only the one who posted the comment can edit it." };

    comment.comment = newComment;
    await comment.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while editing comment" };
  }
}

export async function deleteComment(commentId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const comment = await Comment.findById(commentId);
    if (!comment) return { error: "Comment not found" };

    const post = await Post.findById(comment.postId);
    if (!post) return { error: "Post not found" };

    if (post.author.toString() !== id || comment.author.toString() !== id) {
      return {
        error:
          "Only the author of the post or the commentor can delete this comment",
      };
    }

    await Comment.findByIdAndDelete(commentId);
    return { success: true, message: "Comment deleted" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while deleting comment" };
  }
}
