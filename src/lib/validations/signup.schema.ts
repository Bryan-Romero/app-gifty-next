import { z } from 'zod'

export const signupSchema = z
  .object({
    username: z.string().nonempty({ error: 'Username is required' }),
    email: z.email('Please enter a valid email'),
    password: z.string().nonempty({ error: 'Passwor is required' }).min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().nonempty({ error: 'Confirm password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

// extract the inferred type
export type Signup = z.infer<typeof signupSchema>

export type SignupFieldErrors = {
  [K in keyof Signup]?: string[]
}

export type SignupState = {
  data?: Signup
  message?: string
  errors?: SignupFieldErrors
  success?: boolean
}
