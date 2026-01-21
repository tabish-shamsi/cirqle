import TUser from "@/types/TUser";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<TUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }],

    verifyEmailToken: { type: String },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<TUser>("User", userSchema);
export default User;
