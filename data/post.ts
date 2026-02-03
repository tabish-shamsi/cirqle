import db from "@/lib/db";
import checkAuth from "./check-auth";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Like from "@/models/Like";
import toJSON from "@/utils/toJSON";
import IPost from "@/types/Post";

export type GetPosts = {
  post: IPost;
  likesCount: number;
  commentsCount: number;
};

export default async function getPosts(userId?: string) {
  await checkAuth();
  await db();

  const posts = await Post.find()
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

  if (!posts || posts.length === 0) return [];

  return Promise.all(
    posts.map(async (post) => {
      const commentsCount = await Comment.countDocuments({ postId: post._id });
      const likesCount = await Like.countDocuments({ postId: post._id });

      return { ...toJSON(post), commentsCount, likesCount };
    }),
  );
}
