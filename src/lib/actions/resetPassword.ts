'use server'

import z from 'zod'

import { resetPassword as resetPasswordService } from '@/services'
import { ResetPassword, resetPasswordSchema, ResetPasswordState } from '../validations/resetPassword.schema'

export async function resetPassword(
  initialState: ResetPasswordState | undefined,
  formData: FormData
): Promise<ResetPasswordState> {
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')
  const token = formData.get('token') || 'aaa'
  const lastSubmittedValues: ResetPassword = {
    password: password?.toString() || '',
    confirmPassword: confirmPassword?.toString() || '',
    token: token?.toString() || '',
  }

  const validatedFields = resetPasswordSchema.safeParse({
    password,
    confirmPassword,
    token,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      lastSubmittedValues,
    }
  }

  // signup
  try {
    await resetPasswordService(validatedFields.data)

    // Return success when signup is successful
    return {
      success: true,
      lastSubmittedValues,
    }
  } catch (error) {
    // Handle signup errors
    if ('fieldErrors' in error) {
      const errors = {}
      Object.entries(error.fieldErrors).forEach(([field, messages]) => {
        errors[field] = messages
      })
      return {
        errors,
        lastSubmittedValues,
      }
    }
    return {
      errors: {
        message: error.message,
      },
      lastSubmittedValues,
    }
  }
}
