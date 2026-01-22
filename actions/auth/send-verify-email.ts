"use server"

import checkAuth from "@/data/check-auth";
import VerificationEmail from "@/emails/verification-email";
import { MAX_RESENDS, RESEND_COOLDOWN, RESEND_RESET_WINDOW } from "@/lib/constants";
import db from "@/lib/db";
import { createTransporter } from "@/lib/nodemailer";
import OTP from "@/models/OTP";
import User from "@/models/User";
import generateOtpToken from "@/utils/generate-otp";
import { render } from "@react-email/components";

const sendVerifyEmail = async () => {
  try {
    const { id, email, name, isVerified } = await checkAuth();
    if (isVerified) {
      return { error: "Email already verified" }
      // throw new Error("Email already verified")
    }

    await db();

    const user = await User.findById(id)
    if (!user) {
      return { error: "User not found" }
      // throw new Error("Email already verified")
    }

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

    await OTP.deleteMany({ userId: id, type: "email_verification" });

    const { expiresAt, otp } = generateOtpToken();
    await OTP.create({
      userId: id,
      code: otp,
      expiresAt,
      type: "email_verification",
    });

    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: "Cirqle",
        to: email,
        subject: "Verify your Cirqle account",
        html: await render(
          VerificationEmail({
            name: name?.split(" ")[0],
            otp,
          }),
        ),
      });
    } catch (error) {
      await OTP.deleteMany({ userId: id, type: "email_verification" });
      return { error: "Something went wrong while sending email" }
    }

    user.otpResendCount += 1;
    user.lastOtpSentAt = new Date();
    await user.save();

    return { success: true, message: "Verification code sent." };
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
};
export default sendVerifyEmail;
