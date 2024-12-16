import { db } from "@/db";
import { workflow } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";

export const getWorkflowById = async (workflowId: string) => {
  try {

    const result = await db.select().from(workflow).where(eq(workflow.id, workflowId));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
