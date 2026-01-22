import IComment from "@/types/Comment";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema<IComment>(
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
  mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
