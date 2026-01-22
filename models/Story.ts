import { STORY_EXPIRES_TIME } from "@/lib/constants";
import IStory from "@/types/Story";
import mongoose from "mongoose";

const storySchema = new mongoose.Schema<IStory>(
  {
    media: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },

    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    expiresAt: { type: Date, default: STORY_EXPIRES_TIME },
  },
  { timestamps: true },
);

const Story =
  mongoose.models.Story || mongoose.model<IStory>("Story", storySchema);
export default Story;
