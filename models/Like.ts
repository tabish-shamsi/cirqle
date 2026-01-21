import TLike from "@/types/TLike";
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema<TLike>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  },
  { timestamps: true },
);

const Like = mongoose.models.Like || mongoose.model<TLike>("Like", likeSchema);
export default Like;
