"use server";

import { auth } from "@/auth";
import { db, workflowExecutions } from "@/db";
import { PeriodToDateRange } from "@/lib/workflow/helpers";
import { WorkflowExecutionStatusEnum } from "@/types/workflow-types";
import { eachDayOfInterval, format } from "date-fns";
import { and, eq, gte, lte } from "drizzle-orm";

type Stats = Record<string, {
  success: number,
  failed: number,
}>


export const getWorkflowExecutionsStatsAction = async (period: Period) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not authenticated")
  }

  const userId = session.user.id
  const dateRange = PeriodToDateRange(period)
  const executions = await db.select().from(workflowExecutions).where(and(
    lte(workflowExecutions.startedAt, dateRange.endDate),
    gte(workflowExecutions.startedAt, dateRange.startDate),
    eq(workflowExecutions.userId, userId)
  ))

  const stats: Stats = eachDayOfInterval({
    start: dateRange.startDate,
    end: dateRange.endDate
  }).map((date) => format(date, "dd-MM-yyyy")).reduce((acc, date) => {
    acc[date] = {
      success: 0,
      failed: 0,
    }
    return acc
  }, {} as Stats)

  executions.forEach((execution) => {
    const date = format(execution.startedAt, "dd-MM-yyyy")
    if (execution.status === WorkflowExecutionStatusEnum.COMPLETED) {
      stats[date].success++
    } else {
      stats[date].failed++
    }
  })

  const results = Object.entries(stats).map(([date, infos]) => ({ date, ...infos }))
  return results
}
