import { getUserByEmail } from "@/lib/user-service";
import { LoginSchema } from "@/schemas/authSchema";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const prisma = new PrismaClient();
const authConfig = {
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
    async session({ session, user }) {
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
