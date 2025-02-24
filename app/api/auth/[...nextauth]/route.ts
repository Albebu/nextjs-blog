import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt'
import { prisma } from '@/lib/prisma'

const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email
          }
        })

        if (!user) return null;

        const passwordCorrect = await compare(credentials?.password || "docker", user?.password || "")

        console.log(passwordCorrect);

        if(passwordCorrect) {
          return {
            id: user?.id.toString(),
            email: user?.email,

          }
        }

        console.log({credentials})
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
