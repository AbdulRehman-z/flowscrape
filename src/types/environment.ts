import { Browser, Page } from "puppeteer"
import { WorkflowTaskType } from "./workflow-types"

export type Environment = {
  browser?: Browser,
  page?: Page,
  phases: Record<string, {
    inputs: Record<string, string>
    outputs: Record<string, string>
  }>
}

/**
 * Represents the execution environment for a workflow task
 *
 * @template T The specific workflow task type this environment is for
 *
 * The environment provides access to task inputs through the getInput method:
 * - Takes an input name that must match one defined in the task's inputs array
 * - Returns the string value for that input
 * - Provides type safety by only allowing valid input names for the task type
 */
export type ExecutionEnvironment<T extends WorkflowTaskType> = {
  getInput(name: T["inputs"][number]["name"]): string
  getBrowser(): Browser | undefined
  setBrowser(browser: Browser): void

  getPage(): Page | undefined
  setPage(page: Page): void
}
