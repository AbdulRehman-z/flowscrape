"use server"

import { auth } from "@/auth"
import { db, workflows } from "@/db"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { CalculateWorkflowCost } from "@/lib/workflow/helpers"
import { WorkflowStatus } from "@/types/workflow-types"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const publishWorkflowAction = async ({ id, flowDefination }: {
  id: string,
  flowDefination: string
}) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id

  const [workflow] = await db.select().from(workflows).where(and(eq(workflows.id, id), eq(workflows.userId, userId)))

  if (!workflow) {
    throw new Error("workflow not found")
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error("Workflow is not in draft")
  }

  const flow = JSON.parse(flowDefination)


  const result = FlowToExecutionPlan(flow.nodes, flow.edges)

  if (result.errors) {
    throw new Error("flow defination not valid")
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated")
  }

  const creditsCost = CalculateWorkflowCost(flow.nodes)
  await db.update(workflows)
    .set({
      defination: flowDefination,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED
    })
    .where(and(eq(workflows.id, id), eq(workflows.userId, userId)))

  revalidatePath(`/workflows/editor/${id}`)
  revalidatePath(`/workflows/executions/${id}`)
}
