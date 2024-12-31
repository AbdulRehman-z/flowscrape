"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflowExecutions } from "@/db/schemas/workflow-schema";
import { and, eq, sql } from "drizzle-orm";

export const getWorkflowExecutions = async (workflowId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Not authenticated");
    }
    const userId = session.user.id;
    const executions = await db.select()
      .from(workflowExecutions)
      .where(
        and(
          eq(workflowExecutions.workflowId, workflowId),
          eq(workflowExecutions.userId, userId)
        )
      )
      .orderBy(sql`${workflowExecutions.createdAt} DESC`)
      .limit(10);
    return executions;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get workflow executions");
  }
};
