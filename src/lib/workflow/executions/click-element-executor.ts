import { ExecutionEnvironment } from "@/types/environment";
import { ClickElementTask } from "../task/click-element-task";


export async function ClickElementExecutor(environment: ExecutionEnvironment<typeof ClickElementTask>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      environment.log.error("Selector is required")
      return false
    }

    await environment.getPage()!.click(selector)
    environment.log.info(`Clicked element ${selector}`)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
