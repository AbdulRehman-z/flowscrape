import { db } from "@/db";
import { workflows } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";

export const getWorkflowById = async (workflowId: string) => {
  try {

    const [result] = await db.select().from(workflows).where(eq(workflows.id, workflowId));

    if (!result) {
      throw new Error(`Couldn't load workflow with id ${workflowId}`)
    }
    return result
  } catch (error: any) {
    console.error(error);
    throw new Error("Error:", error);
  }
};
