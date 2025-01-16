"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflowExecutions } from "@/db/schemas/workflow-schema";
import { Period } from "@/types/dashboard-types";
import { eq, min } from "drizzle-orm";

export const getPeriodsAction = async () => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not logged in")
  }

  const userId = session.user.id

  const [result] = await db.select({
    startedAt: min(workflowExecutions.startedAt)
  })
    .from(workflowExecutions)
    .where(eq(workflowExecutions.userId, userId));

  const currentYear = new Date().getFullYear()
  const minYear = result.startedAt ? new Date(result.startedAt).getFullYear() : currentYear

  const periods: Period[] = []

  for (let year = minYear; year <= currentYear; year++) {
    for (let month = 0; month < 11; month++) {
      periods.push({ month, year })
    }
  }

  return periods
}
