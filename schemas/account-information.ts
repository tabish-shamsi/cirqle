import z from "zod";

export const accountInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.email("Invalid email"),
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
  livesIn: z.string().optional(),
  occupation: z.string().optional(),
});
