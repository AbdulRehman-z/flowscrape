import { ExecutionEnvironment } from "@/types/environment";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/launch-browser-task";

export async function LaunchBrowserExecutor(environment: ExecutionEnvironment<typeof LaunchBrowserTask>): Promise<boolean> {
  try {
    const input = environment.getInput("Website Url")
    const browser = await puppeteer.launch({
      headless: true,
    })
    environment.setBrowser(browser)
    const page = await browser.newPage()
    await page.goto(input)
    environment.setPage(page)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
