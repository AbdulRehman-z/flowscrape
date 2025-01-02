"use server"

import { auth } from "@/auth"
import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflowExecutionPhases, workflowExecutions } from "@/db"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { WorkflowExecutionPhaseStatusEnum, WorkflowExecutionPlanType, WorkflowExecutionStatusEnum, WorkflowStatus, WorkflowTriggerEnum } from "@/types/workflow-types"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

// Main function to execute a workflow, takes workflowId and optional flowDefinition
export const runWorkflowAction = async (form: { workflowId: string, flowDefination?: string }) => {
  // Authenticate user and get session
  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id
  const { workflowId, flowDefination } = form

  let executionPlan: WorkflowExecutionPlanType
  let workflowDefination = flowDefination

  // Fetch the workflow details by ID
  const workflow = await getWorkflowById(workflowId)
  if (!workflow) {
    throw new Error("Workflow not found")
  }

  // Handle published workflows - use stored execution plan
  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.executionPlan) {
      throw new Error("Defination not provided")
    }

    executionPlan = JSON.parse(workflow.executionPlan)
    workflowDefination = workflow.defination
  } else {
    // Handle unpublished workflows - generate execution plan from flow definition
    if (!flowDefination) {
      throw new Error("Defination not provided")
    }

    const flow = JSON.parse(flowDefination)
    const result = FlowToExecutionPlan(flow.nodes, flow.edges)

    if (result.errors) {
      throw new Error("Invalid workflow flowDefination")
    }

    if (!result.executionPlan) {
      throw new Error("no execution plan generated")
    }
    executionPlan = result.executionPlan
  }

  // Inner function to handle the execution creation process
  const execution = async () => {
    try {
      // Create new workflow execution record in database
      const [workflowExecution] = await db.insert(workflowExecutions)
        .values({
          workflowId,
          userId,
          status: WorkflowExecutionStatusEnum.PENDING,
          startedAt: new Date(),
          defination: workflowDefination,
          trigger: WorkflowTriggerEnum.MANUAL,
        })
        .returning();

      // Transform execution plan phases into database records
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

      // Insert all execution phases into database
      await db.insert(workflowExecutionPhases)
        .values(phasesData);

      // Retrieve complete execution record with associated phases
      const result = await db.query.workflowExecutions.findFirst({
        where: (executions) => eq(executions.id, workflowExecution.id),
        with: {
          phases: true,
        }
      });

      return result

    } catch (error) {
      // Log error and cleanup any partial execution data
      console.error('Error in execution creation:', error);
      if (workflowExecutions?.id) {
        await db.delete(workflowExecutions)
          .where(eq(workflowExecutions.id, workflowExecutions.id));
      }
      throw error;
    }
  };

  // Execute the workflow creation process
  const executionResult = await execution()

  if (!executionResult) {
    throw new Error("Failed to create workflow execution")
  }

  // Trigger the actual workflow execution and redirect to results page
  ExecuteWorkflow(executionResult.id) // TODO: move this to a background job
  redirect(
    `/workflows/executions/${workflowId}/${executionResult.id}`
  )
}
