"use server"

import { auth } from "@/auth"
import { db, userPurchase } from "@/db"
import { eq, sql } from "drizzle-orm"

export const getCreditsPurchasesAction = async () => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not authenticated")
  }

  const uesrId = session.user.id
  const history = await db.select().from(userPurchase).where(eq(
    userPurchase.userId,
    uesrId
  )).orderBy(sql`${userPurchase.date} DESC`)

  return history
}
