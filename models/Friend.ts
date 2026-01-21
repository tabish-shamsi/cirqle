import { FRIEND_STATUS } from "@/lib/constants";
import TFriend from "@/types/TFriend";
import mongoose from "mongoose";

const friendSchema = new mongoose.Schema<TFriend>(
  {
    requestorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    acceptorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
    },
  },
  { timestamps: true },
);

const Friend =
  mongoose.models.Friend || mongoose.model<TFriend>("Friend", friendSchema);
export default Friend;
