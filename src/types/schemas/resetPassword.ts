import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, 'Passwor is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>

// Esto te da un array con las keys del objeto
export const resetPasswordSchemaKeys = Object.keys(resetPasswordSchema._def.schema.shape)
