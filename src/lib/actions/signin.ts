'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'

import { signIn } from '@/auth'
import { Signin, signinSchema, SigninState } from '../validations/signin.schema'

export async function signin(initialState: SigninState | undefined, formData: FormData): Promise<SigninState> {
  const email = formData.get('email')
  const password = formData.get('password')
  const lastSubmittedValues: Signin = {
    email: email?.toString() || '',
    password: password?.toString() || '',
  }

  const validatedFields = signinSchema.safeParse({
    email,
    password,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      lastSubmittedValues,
    }
  }

  // Authenticate user
  try {
    await signIn('credentials', {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    })

    // Revalidate all pages to force refresh
    revalidatePath('/', 'layout')

    // Return success when signin is successful
    return {
      success: true,
      lastSubmittedValues,
    }
  } catch (error) {
    // Handle authentication errors
    return {
      errors: {
        message: error.code,
      },
      lastSubmittedValues,
    }
  }
}
