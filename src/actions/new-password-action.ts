"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db, users } from "@/db";
import { newPasswordSchema } from "@/schemas/auth-schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const newPasswordAction = async (formData: z.infer<typeof newPasswordSchema>, token: string | null) => {
  const validatedData = newPasswordSchema.safeParse(formData)
  if (validatedData.error) {
    return { error: "Invalid Data" }
  }

  if (!token) {
    return { error: "Missing token!" }
  }

  const { password } = validatedData.data
  const existingToken = await getPasswordResetTokenByToken(token)
  if (!existingToken) {
    return { error: "Invalid token!" }
  }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser?.email) {
    return { error: "Email does not exist!" }
  }

  const hashedPassword = await hash(password, 10)
  await db.update(users).set({
    password: hashedPassword
  }).where(eq(users.email, existingUser.email))

  return { success: "Password successfully reset!" }
}
