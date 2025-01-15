"use server"

import { auth } from "@/auth"
import { credentials, db } from "@/db"
import { eq, sql } from "drizzle-orm"

export const getCredentialsAction = async () => {
  try {
    const session = await auth()
    if (!session?.user.id) {
      throw new Error("User not authenticated")
    }

    const userId = session?.user.id
    const results = await db.select().from(credentials).where(eq(credentials.userId, userId)).orderBy(sql`${credentials.createdAt} DESC`);
    return results
  } catch (error) {
    console.error(error)
    throw new Error("Something went wrong")
  }
}
