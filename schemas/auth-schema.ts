import { PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

// login form schema
export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false).optional(),
});

// login schema types
export type TLoginSchema = z.infer<typeof loginSchema>;

// register schema
export const registerSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),
  username: z
    .string()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long"),

  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  birthday: z.date().refine(
    (date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 18;
    },
    {
      message: "You must be at least 18 years old",
    },
  ),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      PASSWORD_REGEX,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
    ),
  terms: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must accept the terms and conditions",
    })
    .optional(),
});

// register schema types
export type TRegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .regex(
        PASSWORD_REGEX,
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
      ),
    cpassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.cpassword, {
    message: "Passwords do not match",
    path: ["cpassword"], // 👈 shows error on confirm password field
  });

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const verifyAccountSchema = z.object({
  code: z.string().min(1, "Verification Code is required"),
});

export type TVerifyAccountSchema = z.infer<typeof verifyAccountSchema>;

export const findMyAccountSchema = z.object({
  identifier: z.string().min(1, "Username or Email is required"),
});

export type TFindMyAccountSchema = z.infer<typeof findMyAccountSchema>;
