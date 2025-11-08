import { z } from 'zod'

export const emailSchema = z.object({
  email: z.email('Please enter a valid email'),
})

// extract the inferred type
export type Email = z.infer<typeof emailSchema>

export type EmailFieldErrors = {
  [K in keyof Email]?: string[]
}

export type EmailState = {
  data?: Email
  message?: string
  errors?: EmailFieldErrors
  success?: boolean
}
