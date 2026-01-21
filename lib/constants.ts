export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const FRIEND_STATUS = {
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
  blocked: "blocked",
};

export const STORY_EXPIRES_TIME = Date.now() + 24 * 60 * 60 * 1000;
