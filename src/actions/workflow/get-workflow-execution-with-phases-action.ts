"use server"

import { auth } from "@/auth"
import { db, workflowExecutions } from "@/db"
import { eq } from "drizzle-orm"

export const getWorkflowExecutionWithPhasesAction = async (
  executionId: string
) => {
  try {
    // Check for required parameters
    if (!executionId) {
      throw new Error("Workflow ID and Execution ID are required")
    }

    // Auth check
    const session = await auth()
    if (!session?.user.id) {
      throw new Error("Unauthorized")
    }

    // Get the execution data
    const result = await db.query.workflowExecutions.findFirst({
      with: {
        phases: true
      },
      where: eq(workflowExecutions.id, executionId)
    })

    if (!result) {
      throw new Error("Workflow execution not found")
    }

    return result

  } catch (error) {
    console.error("Error in getWorkflowExecutionWithPhasesAction:", {
      error,
      executionId
    })
    throw new Error("An unexpected error occurred", { cause: error })
  }
}
