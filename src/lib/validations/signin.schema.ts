import { z } from 'zod'

export const signinSchema = z.object({
  email: z.email('Please enter a valid email'),
  password: z.string().nonempty({ error: 'Passwor is required' }),
})

// extract the inferred type
export type Signin = z.infer<typeof signinSchema>

export type SigninFieldErrors = {
  [K in keyof Signin]?: string[]
}

export type SigninState = {
  data?: Signin
  message?: string
  errors?: SigninFieldErrors
  success?: boolean
}
