"use server"

import { auth } from "@/auth"
import { getWorkflowById } from "@/data/workflow/get-workflow"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"

export const executeWorkflowAction = async (form: { workflowId: string, defination?: string }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  const { workflowId, defination } = form

  const workflow = await getWorkflowById(workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  if (!defination) {
    throw new Error("Defination not provided")
  }

  const parsedDefination = JSON.parse(defination)
  const result = FlowToExecutionPlan(parsedDefination.nodes, parsedDefination.edges)

  if (result.errors) {
    throw new Error("Invalid workflow defination")
  }

  if (!result.executionPlan) {
    throw new Error("no execution plan generated")
  }

  const executionPlan = result.executionPlan
}
