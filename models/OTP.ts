import IOTP from "@/types/OTP";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema<IOTP>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  type: {
    type: String,
    required: true,
    enum: ["email_verification", "change_password"],
  },
});

otpSchema.pre("save", async function () {
  this.code = await bcrypt.hash(this.code, 10);
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", otpSchema);
export default OTP;
