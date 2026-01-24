"use server"

import checkAuth from "@/data/check-auth";
import OtpActionEmail from "@/emails/OtpActionEmail";
import { MAX_RESENDS, RESEND_COOLDOWN, RESEND_RESET_WINDOW } from "@/lib/constants";
import db from "@/lib/db";
import { createTransporter } from "@/lib/nodemailer";
import OTP from "@/models/OTP";
import User from "@/models/User";
import { OtpEmailType } from "@/types/types";
import generateOtpToken from "@/utils/generate-otp";
import { render } from "@react-email/components";

interface EmailOTPProps {
    emailType: OtpEmailType, email?: string, resend: boolean
}

const emailOTP = async ({ emailType, email, resend }: EmailOTPProps) => {
    try {
        let userEmail;
        if (emailType !== "password_reset") {
            const { email } = await checkAuth()
            userEmail = email
        } else {
            userEmail = email
        }

        await db();
        const user = await User.findOne({ email: userEmail })

        if (!user) {
            return { error: "User not found" }
        }

        if (emailType === "change_password" && user.allowChangePassword) return { error: "User is already verified" }

        const now = Date.now();

        if (
            user.lastOtpSentAt &&
            now - user.lastOtpSentAt.getTime() < RESEND_COOLDOWN
        ) {
            return { error: "Please wait before requesting another OTP" };
        }

        if (user.otpResendCount >= MAX_RESENDS) {
            if (
                user.lastOtpSentAt &&
                now - user.lastOtpSentAt.getTime() > RESEND_RESET_WINDOW
            ) {
                user.otpResendCount = 0;
            } else {
                return { error: "Too many OTP requests. Try again later." };
            }
        }

        const alreadySentOTP = await OTP.findOne({ userId: user._id, type: emailType })

        if (alreadySentOTP && alreadySentOTP.expiresAt > new Date() && !resend) {
            return {}
        }

        await OTP.deleteMany({ userId: user._id, type: emailType });

        const { expiresAt, otp } = generateOtpToken();
        // TODO: REMOVE IN PRODUCTION
        console.log("VERIFICATION CODE: ", otp)

        await OTP.create({
            userId: user._id,
            code: otp,
            expiresAt,
            type: emailType,
        });

        try {
            const transporter = createTransporter();
            // await transporter.sendMail({
            //     from: "Cirqle",
            //     to: user.email,
            //     subject: "Verify your Cirqle account",
            //     html: await render(OtpActionEmail({ type: emailType, otp, name: user.name })),
            // });
        } catch (error) {
            await OTP.deleteMany({ userId: user._id, type: emailType });
            console.error(error)
            return { error: "Something went wrong while sending email" }
        }

        if (!resend) return { success: true, message: "Verification code sent." };

        user.otpResendCount += 1;
        user.lastOtpSentAt = new Date();
        await user.save();

        return { success: true, message: "Verification code sent." };
    } catch (error) {
        console.log(error)
        return { error: "Something went wrong. Please try again later." }
    }
};
export default emailOTP;
