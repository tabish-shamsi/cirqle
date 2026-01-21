import { STORY_EXPIRES_TIME } from "@/lib/constants";
import TStory from "@/types/TStory";
import mongoose from "mongoose";

const storySchema = new mongoose.Schema<TStory>(
  {
    media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },

    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    expiresAt: { type: Date, default: STORY_EXPIRES_TIME },
  },
  { timestamps: true },
);

const Story =
  mongoose.models.Story || mongoose.model<TStory>("Story", storySchema);
export default Story;
