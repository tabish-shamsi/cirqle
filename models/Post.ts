import mongoose, { Schema, Types } from "mongoose";

const PostSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    media: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media",
      },
    ],
    mediaType: {
      type: String,
      enum: ["image", "video", null],
      default: null,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Custom validation
 */
PostSchema.pre("validate", async function (next) {
  if (!this.media || this.media.length === 0) {
    this.mediaType = null;
    return
  }

  if (this.mediaType === "video" && this.media.length !== 1) {
    return new Error("A post can contain only one video")
  }

  if (this.mediaType === "image" && this.media.length > 4) {
    return new Error("A post can contain up to 4 images")
  }

  return
});

export default mongoose.models.Post ||
  mongoose.model("Post", PostSchema);
