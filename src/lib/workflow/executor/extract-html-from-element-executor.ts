import { ExecutionEnvironment } from "@/types/environment";
import { ExtractTextFromElement } from "../task/extractTextFromHtml-task";
import * as cheerio from "cheerio"

export async function ExtractHtmlFromElementExecutor(environment: ExecutionEnvironment<typeof ExtractTextFromElement>): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector")
    if (!selector) {
      console.error("No selector provided")
      environment.log.info("No selector provided")
      return false
    }

    const html = environment.getInput("HTML")
    if (!html) {
      console.error("No HTML provided")
      environment.log.error("No HTML provided")
      return false
    }

    const $ = cheerio.load(html)
    const element = $(selector)
    if (!element.length) {
      console.error("No element found")
      environment.log.error("No element found")
      return false
    }

    const extractedText = $.text(element)
    if (!extractedText) {
      console.error("No text found")
      environment.log.error("No text found")
      return false
    }

    environment.setOutput("Extracted text", extractedText)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
