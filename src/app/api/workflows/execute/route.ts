import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflowExecutionPhases, workflowExecutions } from "@/db"
import { ExecuteWorkflow } from "@/lib/workflow/execute-workflow"
import { isValidToken } from "@/lib/workflow/helpers"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { WorkflowExecutionPhaseStatusEnum, WorkflowExecutionPlanType, WorkflowExecutionStatusEnum, WorkflowTriggerEnum } from "@/types/workflow-types"
import cronsParser from "cron-parser"
import { eq } from "drizzle-orm"
import { revalidatePath, revalidateTag } from "next/cache"

export async function GET(req: Request) {
  const authHeader = req.headers.get("Authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 })
  }
  const token = authHeader.split(" ")[1]
  if (!isValidToken(token)) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const workflowId = searchParams.get("workflowId") as string
  const workflow = await getWorkflowById(workflowId)
  if (!workflow) {
    return new Response("Not Found", { status: 404 })
  }

  const executionPlan = JSON.parse(workflow.executionPlan!) as WorkflowExecutionPlanType

  if (!executionPlan) {
    return new Response("Workflow execution plan not found", { status: 404 })
  }

  let nextRun;

  //  Execute workflow
  const execution = async () => {
    try {
      const cron = cronsParser.parseExpression(workflow.cron!, { utc: true })
      nextRun = cron.next().toDate()
      console.log({ nextRun })
      // Create new workflow execution record in database
      const [workflowExecution] = await db.insert(workflowExecutions)
        .values({
          workflowId,
          userId: workflow.userId,
          status: WorkflowExecutionStatusEnum.PENDING,
          startedAt: new Date(),
          defination: workflow.defination,
          trigger: WorkflowTriggerEnum.CRON,
        })
        .returning();

      // Transform execution plan phases into database records
      const phasesData = executionPlan.flatMap((phase) =>
        phase.nodes.flatMap((node) => ({
          userId: workflow.userId,
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


  const executionResult = await execution()
  if (!executionResult) {
    return new Response("Workflow execution failed", { status: 500 })
  }

  await ExecuteWorkflow(executionResult.id, nextRun)
  return new Response("Workflow execution completed", { status: 200 })
}
