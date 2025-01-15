"use server"

import { auth } from "@/auth"
import { credentials, db } from "@/db"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const deleteCredentialAction = async (credentialName: string) => {
  try {
    const session = await auth()
    if (!session?.user.id) {
      throw new Error("user not authenticated")
    }

    const userId = session.user.id

    await db.delete(credentials).where(and(eq(credentials.name, credentialName), eq(credentials.userId, userId)))

  } catch (error) {
    throw new Error(`failed to delete credential: ${error}`)
  } finally {
    revalidatePath("/credentials")
  }
}
