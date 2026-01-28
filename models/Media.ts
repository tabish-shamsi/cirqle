import mongoose, { Schema, Types } from "mongoose";

export type MediaType = "image" | "video";

const MediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    fileId: {
      type: String, // ImageKit fileId
      required: true,
    },
    width: Number,
    height: Number,
    duration: Number, // for video (seconds)
    isUsed: { type: Boolean, default: false },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

export default mongoose.models.Media ||
  mongoose.model("Media", MediaSchema);
