import { ExecutionEnvironment } from "@/types/environment";
import { ReadPropertyFromJsonTask } from "../task/read-property-from-json-task";


export async function ReadPropertyFromJsonExecutor(environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>): Promise<boolean> {
  try {
    const json = environment.getInput("JSON")
    if (!json) {
      environment.log.error("JSON is required")
      return false
    }

    const propertyName = environment.getInput("Property name")
    if (!propertyName) {
      environment.log.error("property name is required")
      return false
    }

    const parsedJson = JSON.parse(json)
    const propertyValue = parsedJson[propertyName]
    if (propertyValue === undefined) {
      environment.log.error("property not defined")
      return false
    }

    environment.setOutput("Property value", propertyValue)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
