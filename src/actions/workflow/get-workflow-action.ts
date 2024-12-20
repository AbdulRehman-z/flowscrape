"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflows } from "@/db/schemas/workflow-schema";
import { eq } from "drizzle-orm";

export const getWorkflowsAction = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    const results = await db.select().from(workflows).where(eq(workflows.userId, session.user.id));
    return results
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong!");
  }
};
