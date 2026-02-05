import db from "@/lib/db";
import checkAuth from "./check-auth";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import toJSON from "@/utils/toJSON";
import sleep from "@/utils/sleep";
import { POSTS_LIMIT } from "@/lib/constants";

export default async function getPosts(skip?: number, userId?: string) {
  const { id } = await checkAuth();
  await db();

  let posts = [];
  if (userId) {
    posts = await Post.find({ author: userId })
      .populate({
        path: "author",
        select: "name avatar",
        populate: { path: "avatar", select: "url" },
      })
      .populate({
        path: "media",
        select: "url type",
      })
      .sort({ createdAt: -1 })
      .limit(POSTS_LIMIT)
      .skip(skip ?? 0);
  } else {
    posts = await Post.find()
      .populate({
        path: "author",
        select: "name avatar",
        populate: { path: "avatar", select: "url" },
      })
      .populate({
        path: "media",
        select: "url type",
      })
      .sort({ createdAt: -1 })
      .limit(POSTS_LIMIT)
      .skip(skip ?? 0);
  }

  if (!posts || posts.length === 0) return [];

  return Promise.all(
    posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      const likesCount = await Like.countDocuments({ postId: post._id });
      const isLiked = await Like.findOne({ postId: post._id, userId: id });

      return {
        ...toJSON(post),
        commentsCount,
        likesCount,
        isLiked: isLiked ? true : false,
      };
    }),
  );
}

export async function getPostById(postId: string) {
  const { id } = await checkAuth();
  await db();
  
  const post = await Post.findById(postId)
    .sort({ createdAt: -1 })
    .populate({
      path: "author",
      select: "name avatar",
      populate: { path: "avatar", select: "url" },
    })
    .populate({
      path: "media",
      select: "url type",
    });

  if (!post) return null;
  const commentsCount = await Comment.countDocuments({ postId });
  const likesCount = await Like.countDocuments({ postId });
  const isLiked = await Like.findOne({ postId, userId: id });

  return {
    ...toJSON(post),
    commentsCount,
    likesCount,
    isLiked: isLiked ? true : false,
  };
}

export async function getComments(postId: string) {
  const res = await fetch(`/api/posts/${postId}/get-comments`);
  const data = await res.json();

  return data;
}
