import { ExecutionEnvironment } from "@/types/environment";
import { FillInputTask } from "../task/fill-input-task";


export async function FillInputExecutor(environment: ExecutionEnvironment<typeof FillInputTask>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      environment.log.error("Selector is required")
      return false
    }

    const value = environment.getInput("Value")
    if (!value) {
      environment.log.error("Value is required")
      return false
    }

    await environment.getPage()!.type(selector, value)
    environment.log.info(`Filled input ${selector} with value ${value}`)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
