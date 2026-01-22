import IUser from "@/types/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: Date, required: true },
    password: { type: String, required: true, select: false },
    isVerified: { type: Boolean, default: false },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Friend" }],

    otpResendCount: Number,
    lastOtpSentAt: Date,
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function () {
  const user = this as IUser & mongoose.Document;

  if (!user.isModified("password")) return;

  user.password = await bcrypt.hash(user.password, 12);
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) throw new Error("Password not selected for comparison");
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
