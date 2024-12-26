"use server";

import { auth } from "@/auth";
import { db, workflowExecutionPhases } from "@/db";
import { and, eq } from "drizzle-orm";
export const getWorkflowExecutionPhaseDetailsAction = async (phaseId: string) => {
  try {
    if (!phaseId) {
      throw new Error("Invalid phase id");
    }

    const session = await auth();
    if (!session?.user.id) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const result = await db.select().from(workflowExecutionPhases).where(and(eq(
      workflowExecutionPhases.userId, userId
    ), eq(
      workflowExecutionPhases.id, phaseId
    )))

    if (!result || result.length === 0) {
      throw new Error("Phase not found");
    }

    return result.at(0);

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to get workflow execution phase: ${error.message}`);
    }
    throw new Error("Failed to get workflow execution phase");
  }
}
