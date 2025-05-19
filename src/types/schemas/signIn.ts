import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email not valid" }),
  password: z.string().min(1, "Password is required"),
});

export type TSignInSchema = z.infer<typeof signInSchema>;
