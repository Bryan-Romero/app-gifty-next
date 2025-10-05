import { CredentialsSignin, type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { signinSchema } from './lib/validations/signin.schema'
import { signin } from './services'

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const { email, password } = await signinSchema.parseAsync(credentials)

          const accessRes = await signin({ email, password })

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
          const newError = new CredentialsSignin()
          newError.code = error.message
          throw newError
        }
      },
    }),
  ],
} satisfies NextAuthConfig
