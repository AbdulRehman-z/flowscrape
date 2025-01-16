import { ExecutionEnvironment } from "@/types/environment";
import { ExtractDataWithAiTask } from "../task/extract-data-ai-task";
import Groq from "groq-sdk"
import { credentials } from "@/db/index"
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { symmetricDecrypt } from "@/lib/encryption";


export async function ExtractDataWithAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAiTask>): Promise<boolean> {
  try {
    const content = environment.getInput("Content")
    if (!content) {
      environment.log.error("content is required")
      return false
    }

    const prompt = environment.getInput("Prompt")
    if (!prompt) {
      environment.log.error("prompt is required")
      return false
    }

    const credentialInput = environment.getInput("Credentials")
    if (!credentialInput) {
      environment.log.error("credential is required")
      return false
    }


    const [credential] = await db.select().from(credentials).where(eq(credentials.id, credentialInput))
    if (!credential) {
      environment.log.error("credential not found")
      return false
    }

    const plainCredentialValue = symmetricDecrypt(credential.value!)
    if (!plainCredentialValue) {
      environment.log.error("failed to decrypt credential")
      return false
    }

    const mockExtractedData = {
      usernameSelector: "#username",
      passwordSelector: "#password",
      loginSelector: "body > div > form > input.btn.btn-primary"
    }
    environment.setOutput("Extracted data", JSON.stringify(mockExtractedData))

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
