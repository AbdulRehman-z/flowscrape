import { ExecutionEnvironment } from "@/types/environment";
import { DeliverViaWebhookTask } from "../task/deliver-via-webhook-task";


export async function DeliverViaWebhookExecutor(environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL")
    if (!targetUrl) {
      environment.log.error("Webhook URL is required")
      return false
    }

    const body = environment.getInput("Body")
    if (!body) {
      environment.log.error("Body is required")
      return false
    }
    const response = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(body)
    })
    if (response.status !== 200) {
      environment.log.error(`Status: ${response.status}`)
      return false
    }
    const responseBody = await response.json()
    environment.log.info(`Delivered extracted data via ${targetUrl}`)
    environment.log.info(JSON.stringify(responseBody, null, 4))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
