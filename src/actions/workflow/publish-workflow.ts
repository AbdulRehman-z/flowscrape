import { auth } from "@/auth"
import { db, workflows } from "@/db"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { WorkflowStatus } from "@/types/workflow-types"
import { and, eq } from "drizzle-orm"

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

  const parsedFlow = JSON.parse(flowDefination)
  const result = FlowToExecutionPlan(parsedFlow.nodes, parsedFlow.edges)

  if (result.errors) {
    throw new Error("flow defination not valid")
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated")
  }

}
