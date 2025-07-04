import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { signIn } from './services'
import { signInSchema } from './types'

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const accessRes = await signIn({ email, password })

          return {
            ...accessRes,
            user: {
              ...accessRes.user,
              id: accessRes.user._id, // AdapterUser espera 'id'
            },
          }
        } catch (error) {
          /** NextAuth will always respond to the frontend with a 401
           * When you throw an error in authorize */
          throw error
        }
      },
    }),
  ],
} satisfies NextAuthConfig
