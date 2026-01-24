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
  },
});

otpSchema.pre("save", async function () {
  this.code = await bcrypt.hash(this.code, 10);
});

// Instance method to compare email verification code.
otpSchema.methods.verifyCode = async function (
  code: string,
): Promise<boolean> {
  if (!this.code) throw new Error("Password not selected for comparison");
  return bcrypt.compare(code, this.code);
};

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTP = mongoose.models.OTP || mongoose.model<IOTP>("OTP", otpSchema);
export default OTP;
