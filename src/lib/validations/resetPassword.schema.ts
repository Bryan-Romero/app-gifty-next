import { z } from 'zod'

export const resetPasswordSchema = z
  .object({
    password: z.string().nonempty({ error: 'Passwor is required' }).min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().nonempty({ error: 'Confirm password is required' }),
    token: z.string().nonempty({ error: 'Token is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// extract the inferred type
export type ResetPassword = Partial<z.infer<typeof resetPasswordSchema>>

export type ResetPasswordFieldErrors = {
  [K in keyof ResetPassword]?: string[]
}

export type ResetPasswordState = {
  data?: ResetPassword
  message?: string
  errors?: ResetPasswordFieldErrors
  success?: boolean
}
