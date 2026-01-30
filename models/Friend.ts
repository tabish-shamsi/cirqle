import IFriend from "@/types/Friend";
import mongoose from "mongoose";

const friendSchema = new mongoose.Schema<IFriend>(
  {
    requestor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    acceptor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending"
    },
  },
  { timestamps: true },
);

const Friend =
  mongoose.models.Friend || mongoose.model<IFriend>("Friend", friendSchema);
export default Friend;
