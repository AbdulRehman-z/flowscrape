"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflow } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";

export const getWorkflowsAction = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }
    const workflows = await db.select().from(workflow).where(eq(workflow.userId, session.user.id));
    return workflows
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong!", { cause: error });
  }
};
