import NextAuth from 'next-auth'

import authConfig from './auth.config'
import { refreshAccessToken } from './services'

export const { auth, handlers, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      // Initial sign in
      if (user) return { ...token, ...user }

      // Return previous token if the access token has not expired yet
      if (token.tokens && Date.now() < token.tokens.expires_in) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    session: async ({ token, session }) => {
      session.user = token.user
      session.tokens = token.tokens
      session.error = token.error

      return session
    },
  },
})
