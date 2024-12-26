import { ExecutionEnvironment } from "@/types/environment";
import { PageToHtmlTask } from "../task/pageToHtml-task";

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
  try {
    const input = environment.getInput("Web page")
    console.log({ input })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
