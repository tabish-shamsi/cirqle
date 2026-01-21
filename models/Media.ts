import TMedia from "@/types/TMedia";
import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema<TMedia>(
  {
    url: { type: String, required: true },
    type: { type: String, default: "image", enum: ["image", "video", "story"] },
    imagekitId: { type: String, required: true },

    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Media = mongoose.models.Media || mongoose.model<TMedia>("Media", mediaSchema);
export default Media