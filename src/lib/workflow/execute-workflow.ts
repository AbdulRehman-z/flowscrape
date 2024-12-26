import { db, workflowExecutions, workflows, workflowExecutionPhases } from "@/db"
import { AppNodeType } from "@/types/app-node-types"
import { Environment } from "@/types/environment"
import { TaskParamEnum } from "@/types/task-type"
import { WorkflowExecutionPhaseType, WorkflowExecutionStatusEnum, WorkflowExecutionPhaseStatusEnum } from "@/types/workflow-types"
import { eq, inArray } from "drizzle-orm"
import { Browser, Page } from "puppeteer"
import { ExecutorRegistory } from "./executor/registary"
import { TaskREgistery } from "./task/task-registery"

// 1. Main Workflow Execution Orchestrator
export async function ExecuteWorkflow(executionId: string) {
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

  // Initialize workflow
  await initializeWorkflowExecution(execution.workflowId, executionId)
  await initializePhaseStatuses(execution)

  // Setup environment
  const environment: Environment = {
    phases: {}
  }

  const creditsConsumed = 0
  let executionFailed = false

  // Execute phases
  for (const phase of execution.phases) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const executionResult = await executeWorkflowPhase(phase as WorkflowExecutionPhaseType, environment)

    console.log(`Phase ${phase.name} completed with result ${executionResult.success}`)

    if (!executionResult.success) {
      executionFailed = true
      break
    }
  }

  // Finalize workflow
  finalizeWorkflowExecution(executionId, execution.workflowId, creditsConsumed, executionFailed)
}

// 2. Workflow Initialization Functions
async function initializeWorkflowExecution(workflowId: string, executionId: string) {
  await db.update(workflowExecutions).set({
    status: WorkflowExecutionStatusEnum.RUNNING,
    startedAt: new Date(),
  }).where(eq(workflowExecutions.workflowId, workflowId))

  await db.update(workflows).set({
    lastRunId: executionId,
    lastRunsAt: new Date(),
    lastRunStatus: WorkflowExecutionStatusEnum.RUNNING
  })
}

async function initializePhaseStatuses(execution: { phases: { id: string }[] }) {
  await db.update(workflowExecutionPhases).set({
    status: WorkflowExecutionPhaseStatusEnum.PENDING,
  }).where(inArray(workflowExecutionPhases.id, execution.phases.map((phase) => phase.id)))
}

// 3. Phase Execution Functions
async function executeWorkflowPhase(phase: WorkflowExecutionPhaseType, environment: Environment) {
  const startedAt = new Date()
  const node = JSON.parse(phase.node) as AppNodeType

  // Setup phase environment
  setupEnvironmentForPhase(node, environment)

  // Update phase status
  await db.update(workflowExecutionPhases).set({
    status: WorkflowExecutionPhaseStatusEnum.RUNNING,
    startedAt,
    inputs: JSON.stringify(node.data.inputs)
  }).where(eq(workflowExecutionPhases.id, phase.id))

  // Execute phase
  const creditsRequired = TaskREgistery[node.data.type].credits
  console.log(`Executing phase ${phase.name} with credits required ${creditsRequired}`)

  const success = await executePhase(phase, node, environment)
  await finalizePhase(phase.id, success)
  return { success }
}

async function executePhase(_phase: WorkflowExecutionPhaseType, node: AppNodeType, environment: Environment) {
  const runFn = ExecutorRegistory[node.data.type as keyof typeof ExecutorRegistory]
  if (!runFn) {
    throw new Error(`Executor ${node.data.type} not found`)
  }

  const executionEnvironment = createExecutionEnvironment(node, environment)
  return await runFn(executionEnvironment)
}

// 4. Environment Setup Functions
function setupEnvironmentForPhase(node: AppNodeType, environment: Environment) {
  environment.phases[node.id] = { inputs: {}, outputs: {} }
  const inputs = TaskREgistery[node.data.type].inputs

  for (const input of inputs) {
    if (input.type === TaskParamEnum.BROWSER_INSTANCE) continue
    const inputValue = node.data.inputs[input.name]
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue
    }
  }
}

function createExecutionEnvironment(node: AppNodeType, environment: Environment) {
  return {
    getInput: (name: string) => environment.phases[node.id].inputs[name],
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => environment.browser = browser,
    getPage: () => environment.page,
    setPage: (page: Page) => environment.page = page,
  }
}

// 5. Finalization Functions
async function finalizePhase(phaseId: string, success: boolean) {
  const completedAt = new Date()
  await db.update(workflowExecutionPhases).set({
    status: success ? WorkflowExecutionPhaseStatusEnum.COMPLETED : WorkflowExecutionPhaseStatusEnum.FAILED,
    completedAt
  }).where(eq(workflowExecutionPhases.id, phaseId))
}

async function finalizeWorkflowExecution(executionId: string, workflowId: string, creditsConsumed: number, executionFailed: boolean) {
  const executionRunStatus = executionFailed ? WorkflowExecutionStatusEnum.FAILED : WorkflowExecutionStatusEnum.COMPLETED

  await db.update(workflowExecutions).set({
    status: executionRunStatus,
    completedAt: new Date(),
    creditsConsumed
  }).where(eq(workflowExecutions.id, executionId))

  await db.update(workflows).set({
    lastRunId: executionId,
    lastRunsAt: new Date(),
    lastRunStatus: executionRunStatus
  }).where(eq(workflows.id, workflowId))
}
