import IFriend from "@/types/Friend";
import mongoose from "mongoose";

const friendSchema = new mongoose.Schema<IFriend>(
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
  mongoose.models.Friend || mongoose.model<IFriend>("Friend", friendSchema);
export default Friend;
