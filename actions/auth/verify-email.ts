"use server"

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import OTP from "@/models/OTP";
import User from "@/models/User";

const verifyEmail = async (code: string) => {
  try {
    if (!code) return { error: "Missing required fields" };
    const { id } = await checkAuth();

    await db();
    const user = await User.findByIdAndUpdate(id, { isVerified: true, otpResendCount: 0, lastOtpSentAt: null })
    if (user.isVerified) return { error: "User is already verified" }

    const otpEntry = await OTP.findOne({ userId: id, type: "email_verification" })
    if (!otpEntry) return { error: "That code didn’t work or has expired. Please resend a new one." }

    const isValid = await otpEntry.verifyCode(code)
    const isExpired = otpEntry.expiresAt < new Date()

    if (!isValid || isExpired) return { error: "That code didn’t work or has expired. Please resend a new one." }

    await OTP.findOneAndDelete({ userId: id, type: "email_verification" })

    return { success: true, message: "Email has been verified." }
  } catch (error) {
    console.error(error)
    return { error: "Something went wrong while verifying email." }
  }
};
export default verifyEmail;
