import { ExecutionEnvironment } from "@/types/environment";
import { PageToHtmlTask } from "../task/pageToHtml-task";

export async function PageToHtmlExecutor(environment: ExecutionEnvironment<typeof PageToHtmlTask>): Promise<boolean> {
  try {
    const html = await environment.getPage()?.content()
    if (!html) {
      environment.log.error("No web page provided")
      return false
    }
    environment.setOutput("HTML", html)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
