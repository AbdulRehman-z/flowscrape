import { ExecutionEnvironment } from "@/types/environment";
import { ScrollToElementTask } from "../task/scroll-to-element-task";


export async function ScrollToElementExecutor(environment: ExecutionEnvironment<typeof ScrollToElementTask>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      environment.log.error("Selector is required")
      return false
    }

    await environment.getPage()!.evaluate((selector) => {

      const element = document.querySelector(selector)
      if (!element) {
        throw new Error("element not found")
      }

      const top = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top })
    }, selector)
    environment.log.info(`Clicked element ${selector}`)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
