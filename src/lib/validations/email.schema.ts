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
  values?: Email
  lastSubmittedValues?: Email
  errors?: EmailFieldErrors & { message?: string }
  success?: boolean
}
