"use server"

import { auth } from "@/auth"
import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflows } from "@/db"
import { WorkflowStatus } from "@/types/workflow-types"
import { and, eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const unpublishWorkflowAction = async (workflowId: string) => {

  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Not logged in")
  }

  const userId = session.user.id

  const workflow = await getWorkflowById(workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error("Workflow is not published")
  }

  if (workflow.userId !== userId) {
    throw new Error("You are not the owner of this workflow")
  }

  await db.update(workflows).set({
    executionPlan: null,
    creditsCost: 0,
    status: WorkflowStatus.DRAFT
  }).where(and(eq(workflows.userId, userId), eq(workflows.id, workflowId)))

  revalidatePath(`/workflows/editor/${workflowId}`)
  // revalidatePath(`/workflows/executions/${workflowId}`)
}
