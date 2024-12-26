"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { workflows } from "@/db/schemas/workflow-schema";
import { createFlowNode } from "@/lib/workflow/create-flow-node";
import { CreateWorkflowSchemaType } from "@/schemas/workflow-schema";
import { AppNodeType } from "@/types/app-node-types";
import { TaskTypeEnum } from "@/types/task-type";
import { WorkflowStatus } from "@/types/workflow-types";
import { Edge } from "@xyflow/react";
import { redirect } from "next/navigation";

export const createWorkflowAction = async (
  data: CreateWorkflowSchemaType
) => {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const initialFlow: { nodes: AppNodeType[], edges: Edge[] } = {
    nodes: [],
    edges: []
  }
  initialFlow.nodes.push(createFlowNode(TaskTypeEnum.LAUNCH_BROWSER))

  let result

  try {
    [result] = await db
      .insert(workflows)
      .values({
        userId: session.user.id,
        name: data.name,
        description: data.description,
        status: WorkflowStatus.DRAFT,
        defination: JSON.stringify(initialFlow),
      })
      .returning();

    if (!result) {
      throw new Error("Failed to create workflow")
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes("userId_name_idx")) {
      throw new Error("Workflow with this name already exists");
    }

    console.log(error)
    throw new Error("Failed to create workflow");
  }

  redirect(`/workflows/editor/${result.id}`);
};
