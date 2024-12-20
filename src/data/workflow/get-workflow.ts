import { db } from "@/db";
import { workflows } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";

export const getWorkflowById = async (workflowId: string) => {
  try {

    const result = await db.select().from(workflows).where(eq(workflows.id, workflowId));
    return result.at(0) ?? null;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong");
  }
};
