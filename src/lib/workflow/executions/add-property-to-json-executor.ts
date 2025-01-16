import { ExecutionEnvironment } from "@/types/environment";
import { AddPropertyToJsonTask } from "../task/add-property-to-json-task";


export async function AddPropertyToJsonExecutor(environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>): Promise<boolean> {
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

    const propertyValue = environment.getInput("Property value")
    if (!propertyName) {
      environment.log.error("property name is required")
      return false
    }

    const parsedJson = JSON.parse(json)
    parsedJson[propertyName] = propertyValue

    environment.setOutput("Updated JSON", JSON.stringify(parsedJson))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
