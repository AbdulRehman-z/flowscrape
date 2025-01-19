import { db, workflows } from "@/db";
import { getAppUrl } from "@/lib/workflow/helpers";
import { env } from "@/schemas/env-schema";
import { WorkflowStatus } from "@/types/workflow-types";
import { and, eq, isNotNull, lte } from "drizzle-orm";

export async function GET(req: Request) {
  const now = new Date();
  const workflowsToRun = await db.select({
    workflowId: workflows.id,
  }).from(workflows).where(and(lte(workflows.nextRunAt, now), eq(workflows.status, WorkflowStatus.PUBLISHED), isNotNull(workflows.cron)));

  for (const workflow of workflowsToRun) {
    triggerWorkflow(workflow.workflowId);
  }

  // return response as total number of workflows to run
  return new Response(workflowsToRun.length.toString(), { status: 200 });
}

function triggerWorkflow(workflowId: string) {
  const triggerUrl = getAppUrl(`api/workflows/execute?workflowId=${workflowId}`);

  fetch(triggerUrl, {
    headers: {
      Authorization: `Bearer ${env.API_SECRET}`,
    },
    method: "GET",
    cache: "no-store",
  }).then((response) => {
  }).catch((error) => {
    console.error(error)
  })
}
