import { OTP_EXPIRY } from "@/lib/constants";

export default function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const expiresAt = new Date(Date.now() + OTP_EXPIRY * 60 * 1000); // JS Date

  return { otp: otp.toString(), expiresAt };
}
