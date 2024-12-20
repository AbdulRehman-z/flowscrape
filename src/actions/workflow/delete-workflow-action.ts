"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflows } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";


export async function deleteWorkflowAction(workflowId: string) {
  try {
    // Verify user authentication
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Unauthorized: User must be authenticated"
      };
    }

    // Execute deletion query
    const [deletedWorkflow] = await db
      .delete(workflows)
      .where(eq(workflows.id, workflowId))
      .returning();

    if (!deletedWorkflow) {
      throw new Error(`Failed to delete workflow with ID: ${workflowId}`);
    }

    // Revalidate the workflows page to reflect changes
    revalidatePath("/workflows");

  } catch (error) {
    console.error("Error deleting workflow:", error);
    throw new Error("Internal server error occurred while deleting workflow")
  }
}
