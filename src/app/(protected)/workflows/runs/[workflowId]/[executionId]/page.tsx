import { getWorkflowExecutionWithPhasesAction } from "@/actions/workflow/get-workflow-execution-with-phases-action";
import Topbar from "@/components/workflow/topbar/topbar";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

type ExecutionPageProps = {
  params: Promise<{ workflowId: string, executionId: string }>;
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {

  const { workflowId, executionId } = await params;

  return <div>
    <Topbar title="Execution of phases" workflowId={workflowId} subtitle={executionId} hideButtons={true} />

    <div className="flex flex-col gap-4 p-4">
      <Suspense fallback={<ExecutionPageSkeleton />}>
        <ExecutionViewerWrapper executionId={executionId} />
      </Suspense>
    </div>

  </div>
}


function ExecutionPageSkeleton() {
  return (
    <span className="animate-spin">
      <Loader2Icon />
    </span>
  )
}

async function ExecutionViewerWrapper({ executionId }: { executionId: string }) {
  const executionPhases = await getWorkflowExecutionWithPhasesAction(executionId);

  return (
    <div>
      <h1>Execution workflow with phases</h1>
      <pre>{JSON.stringify(executionPhases, null, 2)}</pre>
    </div>
  )
}
