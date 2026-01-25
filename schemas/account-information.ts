import z from "zod";

export const accountInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  username: z.string().min(2, "Username must be at least 2 characters long"),
  bio: z.string().optional(),
  birthday: z.date().refine(
    (date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 18;
    },
    {
      message: "You must be at least 18 years old",
    }
  ),
  hometown: z.string().optional(),
  current_city: z.string().optional(),
  profession: z.string().optional(),
});

export type TAccountInfoSchema = z.infer<typeof accountInfoSchema>