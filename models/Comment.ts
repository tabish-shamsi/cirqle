import TComment from "@/types/TComment";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema<TComment>(
  {
    comment: { type: String, required: true },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
  },
  { timestamps: true },
);

const Comment =
  mongoose.models.Comment || mongoose.model<TComment>("Comment", commentSchema);

export default Comment;
