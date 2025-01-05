"use server"

import { auth } from "@/auth"
import { db, workflows } from "@/db"
import parser from "cron-parser"
import { and, eq } from "drizzle-orm"

export const updateWorkflowCronAction = async ({ workflowId, cron }: { workflowId: string, cron: string }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("User not logged in")
  }
  const userId = session.user.id

  try {
    const interval = parser.parseExpression(cron, { utc: true })
    await db.update(workflows).set({
      cron,
      nextRunAt: interval.next().toDate()
    }).where(and(eq(workflows.id, workflowId), eq(workflows.userId, userId)))
  } catch (error) {
    console.error(error)
    throw new Error("Invalid cron expression")
  }
}
