import { ExecutionEnvironment } from "@/types/environment";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser-task";
import { toast } from "sonner";

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
  try {
    const input = environment.getInput("Website Url")
    const browser = await puppeteer.launch({
      headless: true,
    })
    environment.setBrowser(browser)
    environment.log.info(`Launching browser with url: ${input}`)
    const page = await browser.newPage()
    await page.goto(input)
    environment.setPage(page)
    environment.log.info(`Navigated to url: ${input}`)
    return true
  } catch (error) {
    if (error === "Navigation timeout of 30000 ms exceeded") {
      environment.log.error("Navigation timeout of 30000 ms exceeded")
      toast.error("Navigation timeout of 30000 ms exceeded")
      return false
    }
    console.error(error)
    return false
  }
}
