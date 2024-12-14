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

  console.log("exe 1")

  const hasExpired = new Date(existigToken.expires) < new Date()
  if (hasExpired) {
    console.log("has expired")

    return { error: "Token has expired! Retry login or signup to get new token!" }
  }

  console.log("exe 2")

  const existingUser = await getUserByEmail(existigToken.email)
  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  console.log("exe 3")


  await db.update(users).set({
    email: existigToken.email,
    emailVerified: new Date()
  }).where(eq(users.id, existingUser.id))

  console.log("exe 4")


  await db.delete(verificationTokens).where(eq(verificationTokens.id, existigToken.id!))

  // console.log(existingUser)

  return { success: "Email verified!" }
}
