"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflow } from "@/db/schemas/workflow-schema";
import { CreateWorkflowSchemaType } from "@/schemas/workflow-schema";
import { WorkflowStatus } from "@/types/workflow-types";
import { redirect } from "next/navigation";

export const createWorkflowAction = async (
  data: CreateWorkflowSchemaType
) => {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      success: false,
      error: "User not authenticated",
    };
  }

  let result

  try {
    [result] = await db
      .insert(workflow)
      .values({
        userId: session.user.id,
        name: data.name,
        description: data.description,
        status: WorkflowStatus.DRAFT,
        defination: "TODO",
      })
      .returning();

    if (!result) {
      throw new Error("Failed to create workflow")
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes("userId_name_idx")) {
      throw new Error("Workflow with this name already exists");
    }

    throw new Error("Failed to create workflow");
  }

  redirect(`/workflows/editor/${result.id}`);
};
