"use server";

import { signIn } from "@/auth";
import { get2FAConfirmationByUserId } from "@/data/two-factor-cofirmation";
import { get2FATokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/db";
import { twoFactorConfirmation, twoFactorToken } from "@/db/schemas/auth-schema";
import { send2FAToken, sendVerificationMail } from "@/lib/mail";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import { z } from "zod";
import { loginSchema } from "../schemas/auth-schema";

export const loginAction = async (formData: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(formData);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return { error: "Email does not exist" };
  }

  // check if the user is verified, if not, send veerification mail
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationMail(existingUser.email, verificationToken)
    return { success: "Verification email sent! Check your mailbox" };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const existingTwoFactorToken = await get2FATokenByEmail(email)
      if (existingTwoFactorToken?.token !== code) {
        return { error: "Invalid Code!" }
      }

      const hasExpired = new Date(existingTwoFactorToken.expires) < new Date()
      if (hasExpired) {
        return { error: "Code has expired" }
      }

      // delete the existing 2FA token and also confirmation
      await db.delete(twoFactorToken).where(eq(twoFactorToken.id, existingTwoFactorToken.id!))

      const existing2FACofirmation = await get2FAConfirmationByUserId(existingUser.id)
      if (existing2FACofirmation) {
        await db.delete(twoFactorConfirmation).where(eq(twoFactorConfirmation.id, existing2FACofirmation.id!))
      }

      // now create a new confirmation
      await db.insert(twoFactorConfirmation).values({
        userId: existingUser.id
      })
    } else {
      const generated2FAToken = await generateTwoFactorToken(existingUser.email)
      await send2FAToken(generated2FAToken.email, generated2FAToken.token)
      return { code: true }
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credientials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  return { success: "Logged in" };
};
