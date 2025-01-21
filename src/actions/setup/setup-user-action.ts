"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { userBalance } from "@/db/schemas/workflow-schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const setupUserAction = async () => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("User not logged in")
  }
  const userId = session.user.id
  const [result] = await db.select({
    credits: userBalance.credits,
  }).from(userBalance).where(eq(userBalance.userId, userId))

  if (!result) {
    await db.insert(userBalance).values({
      userId,
      credits: 100,
    })
  }

  redirect("/dashboard")
}
