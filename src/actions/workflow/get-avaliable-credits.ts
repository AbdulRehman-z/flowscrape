"use server"

import { auth } from "@/auth"
import { db, userBalance } from "@/db"
import { eq } from "drizzle-orm"

export const getAvaliableCredits = async () => {
  const session = await auth()
  const userId = session?.user.id
  if (!userId) {
    throw new Error("Unauthenticated user")
  }

  const credits = await db.query.userBalance.findFirst({
    where: eq(userBalance.userId, userId)
  })

  if (!credits) {
    throw new Error(`User ${userId} has no credits`)
  }

  return credits.credits
}
