import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Comment from "@/models/Comment";
import IComment from "@/types/Comment";
import toJSON from "@/utils/toJSON";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  const { postId } = await params;
  await checkAuth();

  await db();

  const comments = await Comment.find({ postId, parentId: null })
    .populate({
      path: "author",
      select: "name",
      populate: { path: "avatar", select: "url" },
    })
    .sort({ createdAt: -1 });

  if (!comments || comments.length === 0) return Response.json([]);

  const commentWithReplies: IComment[] = await Promise.all(
    comments.map(async (comment) => {
      const repliesCount = await Comment.countDocuments({
        postId,
        parentId: comment._id,
      });

      return {
        ...toJSON(comment),
        repliesCount,
        replies: [],
      };
    }),
  );

  return Response.json(commentWithReplies);
}
