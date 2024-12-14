import NextAuth, { DefaultSession } from "next-auth";
import Credientials from "next-auth/providers/credentials";
import Facebook from "next-auth/providers/facebook";
import Github from "next-auth/providers/github";

import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { get2FAConfirmationByUserId } from "./data/two-factor-cofirmation";
import { getUserByEmail, getUserById } from "./data/user";
import { twoFactorConfirmation, users } from "./db/schema";
import { loginSchema } from "./schemas/auth-schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
  interface User {
    role?: "USER" | "ADMIN" | null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    Facebook,
    Github,
    Credientials({
      async authorize(credientials) {
        const validatedFields = loginSchema.safeParse(credientials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isValid = await compare(password, user.password);
          if (isValid) return { ...user, id: user.id.toString() };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {

      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")
      console.log({
        user, account
      })
      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")
      console.log("I am 1")


      if (account?.provider !== "credentials") return true;


      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")
      console.log({
        user, account
      })
      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")
      console.log("I am 2")

      if (!user?.id) return false;

      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")
      console.log({
        user, account
      })
      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")
      console.log("I am 3")


      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) {
        return false;
      }


      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")
      console.log({
        existingUser
      })
      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")
      console.log("I am 4")

      // check if the user has enabled 2FA
      if (existingUser.isTwoFactorEnabled) {
        const existing2FACofirmation = await get2FAConfirmationByUserId(user.id)

        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")
        console.log({
          existingUser,
          existing2FACofirmation
        })
        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")
        console.log("I am 5")


        if (!existing2FACofirmation) return false
        if (existing2FACofirmation) {
          await db.delete(twoFactorConfirmation).where(eq(twoFactorConfirmation.userId, user.id))
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")
          console.log({
            existingUser,
            existing2FACofirmation
          })
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")
          console.log("I am 6")

        }
      }


      return true;
    },
    async session({ session, token }) {
      // console.log(`session: ${JSON.stringify(session)}`);
      // console.log(`sessionToken: ${JSON.stringify(token)}`);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role) {
        session.user.role = token.role as "USER" | "ADMIN" | undefined;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      // console.log(`existingUser: ${JSON.stringify(existingUser)}`);
      if (existingUser) {
        token.role = existingUser.role;
      }
      // console.log(`token: ${JSON.stringify(token)}`);
      // console.log(`user: ${JSON.stringify(user)}`);

      return token;
    },
  },
  events: {
    // this event will trigger when someone just registers or logs in with an OAuth provider
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id!));
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
});
