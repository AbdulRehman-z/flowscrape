import { ExecutionEnvironment } from "@/types/environment";
import { WaitforElementTask } from "../task/wait-for-element";


export async function WaitForElementExecutor(environment: ExecutionEnvironment<typeof WaitforElementTask>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      environment.log.error("Selector is required")
      return false
    }

    const visibility = environment.getInput("Visibility")
    if (!visibility) {
      environment.log.error("Visibility is required")
    }

    await environment.getPage()!.waitForSelector(selector, { visible: visibility === "visible", hidden: visibility === "hidden" })
    environment.log.info(`Element ${selector} is ${visibility}`)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
