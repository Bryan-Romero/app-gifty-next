import { refreshAccessToken } from "@/services/apiRes/refreshAccessToken";
import { signIn } from "@/services/apiRes/signIn";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "**********",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password)
            throw new Error("Email and password required");

          const res = await signIn({
            email: credentials.email,
            password: credentials.password,
          });

          return await signIn({
            email: credentials.email,
            password: credentials.password,
          });
        } catch (error) {
          /** NextAuth will always respond to the frontend with a 401
           * When you throw an error in authorize */
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) return { ...token, ...user };

      // Return previous token if the access token has not expired yet
      if (token.tokens && Date.now() < token.tokens.expires_in) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.tokens = token.tokens;
      session.error = token.error;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
