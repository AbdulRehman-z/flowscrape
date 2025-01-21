"use server"

import { auth } from "@/auth"
import { db, workflowExecutionPhases, workflowExecutions } from "@/db"
import { PeriodToDateRange } from "@/lib/workflow/helpers"
import { Period } from "@/types/dashboard-types"
import { WorkflowExecutionPhaseType, WorkflowExecutionStatusEnum } from "@/types/workflow-types"
import { and, eq, gte, inArray, isNotNull, sql } from "drizzle-orm"

const { COMPLETED, FAILED } = WorkflowExecutionStatusEnum

export const getStatsCardsValuesAction = async (selectedPeriod: Period) => {
  // Validate user session
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not logged in")
  }

  const userId = session.user.id
  const dateRange = PeriodToDateRange(selectedPeriod)
  const executions = await db
    .select({
      creditsConsumed: workflowExecutions.creditsConsumed,
      phases: sql<WorkflowExecutionPhaseType[]>`json_agg(${workflowExecutionPhases})`
    })
    .from(workflowExecutions)
    .where(
      and(
        eq(workflowExecutions.userId, userId),
        gte(workflowExecutions.startedAt, dateRange.startDate),
        // lte(workflowExecutions.startedAt, dateRange.endDate),
        inArray(workflowExecutions.status, [COMPLETED, FAILED]),
      )
    )
    .leftJoin(
      workflowExecutionPhases,
      and(
        eq(workflowExecutionPhases.workflowExecutionId, workflowExecutions.id),
        isNotNull(workflowExecutionPhases.creditsConsumed)
      )
    )
    .groupBy(workflowExecutions.id);

  const stats = {
    workflowExecutions: executions.length,
    creditsConsumed: executions.reduce(
      (sum, execution) => sum + (execution.creditsConsumed || 0),
      0
    ),
    phaseExecutions: executions.reduce(
      (sum, execution) => sum + (execution.phases?.length || 0),
      0
    )
  };

  return stats;

  //   // Build filter conditions dynamically
  //   const filters = [
  //     eq(workflowExecutions.userId, userId),
  //     gte(workflowExecutions.startedAt, dateRange.startDate),
  //     lte(workflowExecutions.startedAt, dateRange.endDate),
  //     inArray(workflowExecutions.status, [COMPLETED, FAILED])
  //   ]

  // // Get aggregated stats in a single query
  // const stats = await db
  // .select({
  // workflowExecutions: sql`count(distinct ${workflowExecutions.id})`.as('workflow_count'),
  // creditsConsumed: sql`coalesce(sum(${workflowExecutions.creditsConsumed}), 0)`.as('credits_consumed'),
  // phaseExecutions: sql`coalesce(count(${workflowExecutionPhases.id}), 0)`.as('phase_count')
  // })
  // .from(workflowExecutions)
  // .leftJoin(
  // workflowExecutionPhases,
  // eq(workflowExecutionPhases.workflowExecutionId, workflowExecutions.id)
  // )
  // .where(and(...filters))

  // if (!stats?.length) {
  // return {
  //     workflowExecutions: 0,
  //     creditsConsumed: 0,
  //     phaseExecutions: 0
  // }
  // }

  // return {
  // workflowExecutions: Number(stats[0].workflowExecutions),
  // creditsConsumed: Number(stats[0].creditsConsumed),
  // phaseExecutions: Number(stats[0].phaseExecutions)
  // }
}
