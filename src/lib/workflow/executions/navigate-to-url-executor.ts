import { ExecutionEnvironment } from "@/types/environment";
import { NavigateToUrlTask } from "../task/navigate-to-url-task";


export async function NavigateToUrlExecutor(environment: ExecutionEnvironment<typeof NavigateToUrlTask>): Promise<boolean> {
  try {
    const url = environment.getInput("URL")
    if (!url) {
      environment.log.error("URL is required")
      return false
    }

    await environment.getPage()!.goto(url)
    environment.log.info(`Visited ${url}`)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
