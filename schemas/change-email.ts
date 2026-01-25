import z from "zod";

export const changeEmailSchema = z.object({ 
    newEmail: z.email(),
    confirmEmail: z.email(),
}).refine((data) => data.newEmail === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"],
});

export type TChangeEmail = z.infer<typeof changeEmailSchema>