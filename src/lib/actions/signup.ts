'use server'

import z from 'zod'

import { signup as signupService } from '@/services'
import { Signup, signupSchema, SignupState } from '../validations/signup.schema'

export async function signup(prevState: SignupState | undefined, formData: FormData): Promise<SignupState> {
  const username = formData.get('username')
  const email = formData.get('email')
  const password = formData.get('password')
  const confirmPassword = formData.get('confirmPassword')
  const fields: Signup = {
    username: username?.toString() || '',
    email: email?.toString() || '',
    password: password?.toString() || '',
    confirmPassword: confirmPassword?.toString() || '',
  }

  const validatedFields = signupSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
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
    await signupService(validatedFields.data)

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
