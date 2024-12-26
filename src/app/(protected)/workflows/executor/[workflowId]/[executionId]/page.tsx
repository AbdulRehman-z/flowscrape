import { getWorkflowExecutionWithPhasesAction } from "@/actions/workflow/get-workflow-execution-with-phases-action";
import ExecutionPageContent from "@/components/workflow/execution/execution-page-content";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

type ExecutionPageProps = {
  params: Promise<{ workflowId: string, executionId: string }>;
}

export default async function ExecutionPage({ params }: ExecutionPageProps) {
  const { workflowId, executionId } = await params;
  const executionWorkflowWithPhases = await getWorkflowExecutionWithPhasesAction(executionId);

  return (
    <div className="h-full w-full">
      <Suspense fallback={<ExecutionPageSkeleton />}>
        <ExecutionPageContent
          initialData={executionWorkflowWithPhases}
          workflowId={workflowId}
        />
      </Suspense>
    </div>
  );
}

function ExecutionPageSkeleton() {
  return (
    <div className="flex justify-center items-center">
      <span className="animate-spin">
        <Loader2Icon />
      </span>
    </div>
  );
}
