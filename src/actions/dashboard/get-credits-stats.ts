"use server";

import { auth } from "@/auth";
import { db, workflowExecutionPhases } from "@/db";
import { PeriodToDateRange } from "@/lib/workflow/helpers";
import { Period } from "@/types/dashboard-types";
import { WorkflowExecutionPhaseStatusEnum, WorkflowExecutionStatusEnum } from "@/types/workflow-types";
import { eachDayOfInterval, format } from "date-fns";
import { and, eq, gte, inArray, lte } from "drizzle-orm";

type Stats = Record<string, {
  success: number,
  failed: number,
}>

const { COMPLETED, FAILED } = WorkflowExecutionPhaseStatusEnum

export const getCreditsUsageStatsAction = async (period: Period) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not authenticated")
  }

  const userId = session.user.id
  const dateRange = PeriodToDateRange(period)
  const creditsPhases = await db.select().from(workflowExecutionPhases).where(and(
    lte(workflowExecutionPhases.startedAt, dateRange.endDate),
    gte(workflowExecutionPhases.startedAt, dateRange.startDate),
    eq(workflowExecutionPhases.userId, userId),
    inArray(workflowExecutionPhases.status, [COMPLETED, FAILED])
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

  creditsPhases.forEach((phase) => {
    const date = format(phase.startedAt, "dd-MM-yyyy")
    if (phase.status === WorkflowExecutionPhaseStatusEnum.COMPLETED) {
      stats[date].success += phase.creditsConsumed || 0
    } else {
      stats[date].failed += phase.creditsConsumed || 0
    }
  })

  const results = Object.entries(stats).map(([date, infos]) => ({ date, ...infos }))
  return results
}
