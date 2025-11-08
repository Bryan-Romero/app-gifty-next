'use server'

import z from 'zod'

import { forgotPassword as forgotPasswordService } from '@/services'
import { Email, emailSchema, EmailState } from '../validations/email.schema'

export async function forgotPassword(prevState: EmailState | undefined, formData: FormData): Promise<EmailState> {
  const email = formData.get('email')
  const fields: Email = {
    email: email?.toString() || '',
  }

  const validatedFields = emailSchema.safeParse({
    email,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      success: false,
      errors: z.flattenError(validatedFields.error).fieldErrors,
      data: fields,
    }
  }

  // signup
  try {
    await forgotPasswordService(validatedFields.data)

    // Return success when signup is successful
    return {
      success: true,
      data: validatedFields.data,
    }
  } catch (error) {
    // Handle signup errors
    if ('fieldErrors' in error) {
      const errors = {}
      Object.entries(error.fieldErrors).forEach(([field, messages]) => {
        errors[field] = messages
      })
      return {
        success: false,
        errors,
        data: fields,
      }
    }
    return {
      success: false,
      message: error.message,
      data: fields,
    }
  }
}
