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
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          return await signIn({
            email: credentials.email,
            password: credentials.password,
          });
        } catch (error: any) {
          console.log(error);
          if (error?.response?.status === 403) {
            throw new Error("Invalid credentials");
          } else {
            throw new Error("Something went wrong");
          }
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
