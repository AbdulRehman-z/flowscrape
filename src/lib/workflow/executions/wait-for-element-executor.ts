import { ExecutionEnvironment } from "@/types/environment";
import { WaitforElementTask } from "../task/wait-for-element";


export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitforElementTask>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      environment.log.error("Selector is required")
      return false
    }

    await environment.getPage()!.waitForSelector(selector)

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
