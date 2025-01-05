"use server"

import { auth } from "@/auth"
import { db, workflows } from "@/db"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const removeExecutionCronAction = async (id: string) => {
  try {
    const session = await auth()
    if (!session?.user.id) {
      throw new Error("Not authenticated")
    }
    await db.update(workflows).set({ cron: null, nextRunAt: null }).where(and(eq(workflows.id, id), eq(workflows.userId, session.user.id)))

  } catch (error) {
    console.error(error)
    throw new Error("Failed to remove execution cron")
  }

  revalidatePath("/workflows")
}
