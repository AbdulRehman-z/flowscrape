"use server"

import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflows } from "@/db"
import { WorkflowStatus } from "@/types/workflow-types"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export const updateWorkflowAction = async (id: string, defination: string) => {
  try {
    const workflow = await getWorkflowById(id);
    if (!workflow) {
      throw new Error("Workflow not found");
    }

    if (workflow.status !== WorkflowStatus.DRAFT) {
      throw new Error("Workflow is not in draft status");
    }

    await db.update(workflows).set({
      defination
    }).where(eq(workflows.id, id));

  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong!");
  }

  revalidatePath("/workflows");
}
