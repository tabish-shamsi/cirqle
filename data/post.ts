import db from "@/lib/db";
import checkAuth from "./check-auth";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import toJSON from "@/utils/toJSON";
import { POSTS_LIMIT } from "@/lib/constants";

type GetPostsProps = {
  skip?: number;
  userId?: string;
  postType?: "image" | "video";
  query?: string;
};

export default async function getPosts({
  skip,
  userId,
  postType,
  query,
}: GetPostsProps) {
  const { id } = await checkAuth();
  await db();

  let posts = [];

  // =========================
  // 🔍 SEARCH MODE (AGGREGATION)
  // =========================
  if (query) {
    const regex = new RegExp(query, "i");

    const matchStage = {
      $or: [
        { content: regex },
        { "author.name": regex },
        { "author.username": regex },
      ],
    };

    // Apply optional filters
    // if (userId) matchStage.authorId = userId;
    // if (postType) matchStage.postType = postType;

    posts = await Post.aggregate([
      // Join users
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },

      // Join avatar
      {
        $lookup: {
          from: "media",
          localField: "author.avatar",
          foreignField: "_id",
          as: "author.avatar",
        },
      },
      {
        $unwind: {
          path: "$author.avatar",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Join post media
      {
        $lookup: {
          from: "media",
          localField: "media",
          foreignField: "_id",
          as: "media",
        },
      },

      // Filters
      {
        $match: {
          ...(userId && { author: userId }),
          ...(postType && { postType }),
          ...matchStage,
        },
      },

      // Sorting & pagination
      { $sort: { createdAt: -1 } },
      { $skip: skip ?? 0 },
      { $limit: POSTS_LIMIT },
    ]);
  }

  // =========================
  // 📄 NORMAL MODE (NO SEARCH)
  // =========================
  else {
    const filter: { author?: string; postType?: "image" | "video" } = {};
    if (userId) filter.author = userId;
    if (postType) filter.postType = postType;

    posts = await Post.find(filter)
      .populate({
        path: "author",
        select: "name username avatar",
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

  // =========================
  // ❤️ COUNTS & LIKE STATUS
  // =========================
  return Promise.all(
    posts.map(async (post) => {
      const postId = post._id;

      const commentsCount = await Comment.countDocuments({ postId });
      const likesCount = await Like.countDocuments({ postId });
      const isLiked = await Like.findOne({ postId, userId: id });

      return {
        ...toJSON(post),
        commentsCount,
        likesCount,
        isLiked: !!isLiked,
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
