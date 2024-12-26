"use server"

import { auth } from "@/auth"
import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflowExecutionPhases, workflowExecutions } from "@/db"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { WorkflowExecutionPhaseStatusEnum, WorkflowExecutionStatusEnum, WorkflowTriggerEnum } from "@/types/workflow-types"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export const runWorkflowAction = async (form: { workflowId: string, defination?: string }) => {
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id
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

  const execution = async () => {
    try {
      // Create the workflow execution first
      const [workflowExecution] = await db.insert(workflowExecutions)
        .values({
          workflowId,
          userId,
          status: WorkflowExecutionStatusEnum.PENDING,
          startedAt: new Date(),
          trigger: WorkflowTriggerEnum.MANUAL,
        })
        .returning();

      // Prepare the phases data
      const phasesData = executionPlan.flatMap((phase) =>
        phase.nodes.flatMap((node) => ({
          userId,
          status: WorkflowExecutionPhaseStatusEnum.CREATED,
          number: phase.phase,
          node: JSON.stringify(node),
          name: TaskREgistery[node.data.type].label,
          workflowExecutionId: workflowExecution.id,
        }))
      );

      // Insert all phases
      await db.insert(workflowExecutionPhases)
        .values(phasesData);

      // Fetch the complete execution with phases
      const result = await db.query.workflowExecutions.findFirst({
        where: (executions) => eq(executions.id, workflowExecution.id),
        with: {
          phases: true,
        }
      });

      return result

    } catch (error) {
      // Handle the error appropriately
      console.error('Error in execution creation:', error);
      // You might want to clean up the workflow execution if phase creation fails
      if (workflowExecutions?.id) {
        await db.delete(workflowExecutions)
          .where(eq(workflowExecutions.id, workflowExecutions.id));
      }
      throw error;
    }
  };

  const executionResult = await execution()

  if (!executionResult) {
    throw new Error("Failed to create workflow execution")
  }

  ExecuteWorkflow(executionResult.id) // TODO: move this to a background job
  redirect(
    `/workflows/executor/${workflowId}/${executionResult.id}`
  )
}
