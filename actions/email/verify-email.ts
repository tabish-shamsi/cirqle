"use server"

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { OtpEmailType } from "@/types/types";

const verifyEmail = async ({ code, email, type }: { code: string, email?: string, type: OtpEmailType }) => {
    try {
        let userEmail;
        if (type !== "password_reset") {
            const { email } = await checkAuth()
            userEmail = email
        } else {
            userEmail = email
        }

        await db();
        const user = await User.findOne({ email: userEmail })
        if (user.isVerified && type === "email_verification") return { error: "User is already verified" }

        const otpEntry = await OTP.findOne({ userId: user.id, type })
        if (!otpEntry) return { error: "That code didn’t work or has expired. Please resend a new one." }

        const isValid = await otpEntry.verifyCode(code)
        const isExpired = otpEntry.expiresAt < new Date()

        if (!isValid || isExpired) return { error: "That code didn’t work or has expired. Please resend a new one." }

        await OTP.findByIdAndDelete(otpEntry._id)
        if (type === "email_verification") user.isVerified = true
        if (type === "password_reset" || type === "change_password") user.allowChangePassword = true
        user.otpResendCount = 0;
        user.lastOtpSentAt = null;

        await user.save()

        return { success: true, message: "Email has been verified." }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong while verifying email." }
    }
};

export default verifyEmail;
