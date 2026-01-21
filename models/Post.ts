import TPost from "@/types/TPost";
import mongoose from "mongoose";

const postSchema = new mongoose.Schema<TPost>(
  {
    content: { type: String, required: true },
    media: [{ type: mongoose.Types.ObjectId, ref: "Media" }],
    feeling: { type: String },

    authorId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true },
);

const Post = mongoose.models.Post || mongoose.model<TPost>("Post", postSchema);
export default Post