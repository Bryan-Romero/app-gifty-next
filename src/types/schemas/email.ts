import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email not valid" }),
});

export type TEmailSchema = z.infer<typeof emailSchema>;
