import { ExecutionEnvironment } from "@/types/environment";
import { ExtractDataWithAiTask } from "../task/extract-data-ai-task";


export async function ExtractDataWithAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>): Promise<boolean> {
  try {
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
