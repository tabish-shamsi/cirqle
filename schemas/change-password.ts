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
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // 👈 shows error on confirm password field
});

export type TChangePassword = z.infer<typeof changePasswordSchema>