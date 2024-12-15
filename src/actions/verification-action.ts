"use server"

import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { db, users } from "@/db"
import { verificationTokens } from "@/db/schemas/auth-schema"
import { eq } from "drizzle-orm"

export const newVerification = async function (token: string) {
  const existigToken = await getVerificationTokenByToken(token)

  if (!existigToken) {
    return { error: "Token does not exist!" }
  }


  const hasExpired = new Date(existigToken.expires) < new Date()
  if (hasExpired) {

    return { error: "Token has expired! Retry login or signup to get new token!" }
  }


  const existingUser = await getUserByEmail(existigToken.email)
  if (!existingUser) {
    return { error: "Email does not exist!" }
  }



  await db.update(users).set({
    email: existigToken.email,
    emailVerified: new Date()
  }).where(eq(users.id, existingUser.id))



  await db.delete(verificationTokens).where(eq(verificationTokens.id, existigToken.id!))


  return { success: "Email verified!" }
}
