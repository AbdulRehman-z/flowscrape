import { ExecutionEnvironment } from "@/types/environment";
import { ExtractTextFromElement } from "../task/extractTextFromHtml-task";

export async function ExtractHtmlFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElement>): Promise<boolean> {
  try {
    const input = environment.getInput("HTML")
    console.log({ input })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
