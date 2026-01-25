export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const FRIEND_STATUS = {
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
  blocked: "blocked",
};

export const STORY_EXPIRES_TIME = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

export const OTP_EXPIRY = 10 * 60 * 1000; // 10 minutes

export const MAX_RESENDS = 3;
export const RESEND_COOLDOWN = 60 * 1000; // 60 seconds
export const RESEND_RESET_WINDOW = 60 * 60 * 1000; // 1 hour

export const EMAIL_CHANGE_RESET_WINDOW = 60 * 60 * 1000 * 24 * 30 // 30 days