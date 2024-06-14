import { getUserByEmail } from "@/lib/user-service";
import { LoginSchema } from "@/schemas/authSchema";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      hasNotification: boolean;
      /**
       * By default, Type̦Script merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.hashedPassword) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const currentUser = await getUserByEmail(session.user.email);
      if (currentUser) {
        session.user.id = currentUser?.id;
        session.user.hasNotification = currentUser?.hasNotification as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
});
