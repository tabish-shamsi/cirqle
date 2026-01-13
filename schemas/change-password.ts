import { PASSWORD_REGEX } from "@/lib/constants";
import z from "zod";

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters long"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
    ),
  confirmPassword: z
    .string()
    .min(8, "Password must be at least 8 characters long"),
});
