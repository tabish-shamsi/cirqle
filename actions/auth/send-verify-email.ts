import checkAuth from "@/data/check-auth";
import VerificationEmail from "@/emails/verification-email";
import db from "@/lib/db";
import { createTransporter } from "@/lib/nodemailer";
import OTP from "@/models/OTP";
import generateOtpToken from "@/utils/generate-otp";
import { render } from "@react-email/components";

const sendVerifyEmail = async (type: "resend_email" | "send_email") => {
  const { id, email, name } = await checkAuth();
  try {
    await db();

    await OTP.deleteMany({ userId: id, type: "email_verification" });

    const { expiresAt, otp } = generateOtpToken();
    await OTP.create({
      userId: id,
      code: otp,
      expiresAt,
      type: "email_verification",
    });

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

    return { success: true, message: "Verification code sent." };
  } catch (error) {
    console.error(error);
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
