import { db, workflowExecutions, workflows, workflowExecutionPhases, workflowExecutionPhaseLogs, userBalance } from "@/db"
import { AppNodeType } from "@/types/app-node-types"
import { Environment } from "@/types/environment"
import { TaskParamEnum } from "@/types/task-type"
import { WorkflowExecutionPhaseType, WorkflowExecutionStatusEnum, WorkflowExecutionPhaseStatusEnum } from "@/types/workflow-types"
import { and, eq, gte, inArray, sql } from "drizzle-orm"
import { Browser, Page } from "puppeteer"
import { ExecutorRegistory } from "./executions/registary"
import { TaskREgistery } from "./task/task-registery"
import { Edge } from "@xyflow/react"
import { LogCollector } from "@/types/log.types"
import { createLogCollector } from "../logs"

// 1. Main Workflow Execution Orchestrator
export async function ExecuteWorkflow(executionId: string, nextRun?: Date) {
  // Fetch workflow details
  const execution = await db.query.workflowExecutions.findFirst({
    where: eq(workflowExecutions.id, executionId),
    with: {
      phases: true,
      workflow: true,
    }
  })

  if (!execution) {
    throw new Error(`Workflow execution ${executionId} not found`)
  }

  const edges = JSON.parse(execution.workflow.defination).edges as Edge[]

  // Initialize workflow
  await initializeWorkflowExecution(execution.workflowId, executionId, nextRun)
  await initializePhaseStatuses(execution)

  // Setup environment
  const environment: Environment = {
    phases: {},
  }

  let totalCreditsConsumed = 0
  let executionFailed = false

  // Execute phases
  for (const phase of execution.phases) {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const { success, creditsConsumed
    } = await executeWorkflowPhase(phase as WorkflowExecutionPhaseType, environment, edges)

    totalCreditsConsumed += creditsConsumed

    if (!success) {
      executionFailed = true
      break
    }
  }

  // Finalize workflow
  await finalizeWorkflowExecution(executionId, execution.workflowId, totalCreditsConsumed, executionFailed)
  await cleanUpEnvironment(environment)
}

// 2. Workflow Initialization Functions
async function initializeWorkflowExecution(workflowId: string, executionId: string, nextRun?: Date) {
  await db.update(workflowExecutions).set({
    status: WorkflowExecutionStatusEnum.RUNNING,
    startedAt: new Date(),
  }).where(and(eq(workflowExecutions.workflowId, workflowId), eq(workflowExecutions.id, executionId)))

  await db.update(workflows).set({
    lastRunId: executionId,
    lastRunsAt: new Date(),
    lastRunStatus: WorkflowExecutionStatusEnum.RUNNING,
    ...(nextRun && { nextRunAt: nextRun })
  }).where(eq(workflows.id, workflowId))
}

async function initializePhaseStatuses(execution: { phases: { id: string }[] }) {
  await db.update(workflowExecutionPhases).set({
    status: WorkflowExecutionPhaseStatusEnum.PENDING,
  }).where(inArray(workflowExecutionPhases.id, execution.phases.map((phase) => phase.id)))
}

// 3. Phase Execution Functions
async function executeWorkflowPhase(phase: WorkflowExecutionPhaseType, environment: Environment, edges: Edge[]) {
  const startedAt = new Date()
  const node = JSON.parse(phase.node) as AppNodeType
  const logCollector = createLogCollector()

  // Setup phase environment
  setupEnvironmentForPhase(node, environment, edges)

  // Update phase status
  await db.update(workflowExecutionPhases).set({
    status: WorkflowExecutionPhaseStatusEnum.RUNNING,
    startedAt,
    inputs: JSON.stringify(environment.phases[node.id].inputs)
  }).where(eq(workflowExecutionPhases.id, phase.id))

  // Execute phase
  const creditsRequired = TaskREgistery[node.data.type].credits
  let success = await decrementUserCredits(phase.userId, creditsRequired, logCollector)
  const creditsConsumed = success ? creditsRequired : 0

  if (success) {
    success = await executePhase(phase, node, environment, logCollector)
  }

  const outputs = environment.phases[node.id].outputs
  await finalizePhase(phase.id, success, outputs, logCollector, creditsConsumed)
  return { success, creditsConsumed }
}

async function executePhase(_phase: WorkflowExecutionPhaseType, node: AppNodeType, environment: Environment, logCollector: LogCollector) {
  const runFn = ExecutorRegistory[node.data.type as keyof typeof ExecutorRegistory]
  if (!runFn) {
    logCollector.error(`Executor ${node.data.type} not found`)
    throw new Error(`Executor ${node.data.type} not found`)
  }

  const executionEnvironment = createExecutionEnvironment(node, environment, logCollector)

  return await runFn(executionEnvironment)
}

// 4. Environment Setup Functions
function setupEnvironmentForPhase(node: AppNodeType, environment: Environment, edges: Edge[]) {
  environment.phases[node.id] = { inputs: {}, outputs: {} }
  const inputs = TaskREgistery[node.data.type].inputs

  for (const input of inputs) {
    if (input.type === TaskParamEnum.BROWSER_INSTANCE) continue
    const inputValue = node.data.inputs[input.name]
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue
      continue
    }

    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    )

    if (!connectedEdge) {
      continue
    }

    const outputValue = environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!]


    environment.phases[node.id].inputs[input.name] = outputValue
  }
}

function createExecutionEnvironment(node: AppNodeType, environment: Environment, logCollector: LogCollector) {
  return {
    getInput: (name: string) => environment.phases[node.id].inputs[name],
    setOutput: (name: string, value: string) => environment.phases[node.id].outputs[name] = value,
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => environment.browser = browser,
    getPage: () => environment.page,
    setPage: (page: Page) => environment.page = page,
    log: logCollector
  }
}

// 5. Finalization Functions
async function finalizePhase(phaseId: string, success: boolean, outputs: Record<string, unknown>, logCollector: LogCollector, creditsConsumed: number) {
  const completedAt = new Date()
  await db.update(workflowExecutionPhases)
    .set({
      status: success ? WorkflowExecutionPhaseStatusEnum.COMPLETED : WorkflowExecutionPhaseStatusEnum.FAILED,
      completedAt,
      creditsConsumed,
      outputs: JSON.stringify(outputs),
    })
    .where(eq(workflowExecutionPhases.id, phaseId))

  // Insert logs
  if (logCollector.getAll().length > 0) {
    await db.insert(workflowExecutionPhaseLogs)
      .values(logCollector.getAll().map((log) => ({
        executionPhaseId: phaseId,
        message: log.message,
        logLevel: log.level,
        timestamp: log.timestamp
      })))
  }
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, creditsConsumed: number, executionFailed: boolean) {
  const executionRunStatus = executionFailed ? WorkflowExecutionStatusEnum.FAILED : WorkflowExecutionStatusEnum.COMPLETED

  await db.update(workflowExecutions).set({
    status: executionRunStatus,
    completedAt: new Date(),
    creditsConsumed,
  }).where(eq(workflowExecutions.id, executionId))

  console.log({ executionRunStatus })

  await db.update(workflows).set({
    lastRunId: executionId,
    lastRunsAt: new Date(),
    lastRunStatus: executionRunStatus
  }).where(eq(workflows.id, workflowId))
}

async function cleanUpEnvironment(environment: Environment) {
  if (environment.browser) {
    await environment.browser.close().catch((error) => console.error("cannot close browser, reason: ", error))
  }
}

async function decrementUserCredits(userId: string, credits: number, logCollector: LogCollector) {
  try {
    await db.update(userBalance).set({
      credits: sql`${userBalance.credits} - ${credits}`
    }).where(and(eq(userBalance.userId, userId), gte(userBalance.credits, credits)))
    return true
  } catch (error) {
    logCollector.error(`Error decrementing user credits: ${error}`)
    return false
  }
}
