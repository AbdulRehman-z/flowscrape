"use server"

import { auth } from "@/auth"
import { getWorkflowById } from "@/data/workflow/get-workflow"
import { db, workflows } from "@/db"
import { duplicateWorkflowSchema, DuplicateWorkflowSchemaType } from "@/schemas/workflow-schema"
import { WorkflowStatus } from "@/types/workflow-types"
import { revalidatePath } from "next/cache"

export const duplicateWorkflowAction = async (form: DuplicateWorkflowSchemaType) => {

  const { success, data } = duplicateWorkflowSchema.safeParse(form)
  if (!success) {
    throw new Error("invalid duplicate form data")
  }

  const session = await auth()
  if (!session?.user.id) {
    throw new Error("Unauthorized")
  }

  const workflow = await getWorkflowById(data.workflowId)

  if (!workflow) {
    throw new Error("no workflow to be found")
  }

  const result = await db.insert(workflows).values({
    userId: session.user.id,
    name: data.name,
    description: data.description,
    defination: workflow.defination,
    status: WorkflowStatus.DRAFT
  })

  if (!result) {
    throw new Error("failed duplicating workflow insertion")
  }

  revalidatePath("/workflows")
}
