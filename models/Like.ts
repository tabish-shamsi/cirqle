import ILike from "@/types/Like";
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema<ILike>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true },
);

const Like = mongoose.models.Like || mongoose.model<ILike>("Like", likeSchema);
export default Like;
