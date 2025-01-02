import { getWorkflowExecutions } from "@/actions/workflow/get-workflow-executions";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import ExecutionsTable from "@/components/workflow/execution/executions-table";
import Topbar from "@/components/workflow/topbar/topbar";
import { Suspense } from "react";

type WorkflowExecutionsPageProps = {
  params: Promise<Record<'workflowId', string>>
}

export default async function WorkflowExecutionsPage({ params }: WorkflowExecutionsPageProps) {
  const { workflowId } = await params;

  return (
    <div className="flex flex-col gap-y-4  w-full">
      <Topbar
        title="Workflow Executions"
        subtitle="All the workflow executions"
        workflowId={workflowId}
        key={workflowId}
        hideButtons
      />

      <Suspense fallback={<WorkflowExecutionsSkeleton />}>
        <div className="flex flex-col px-8  pt-6 md:w-10/12 w-full">
          <ExecutionTableWrapper workflowId={workflowId} />
        </div>
      </Suspense>
    </div>
  )
}

function WorkflowExecutionsSkeleton() {
  return (
    <div className="flex flex-col px-8  pt-6 md:w-10/12 w-full space-y-2">
      {
        [1, 2, 3, 4].map((item, index) => (
          <Skeleton key={index} className="h-12" />
        ))
      }
    </div >
  )
}

type ExecutionTableWrapperProps = {
  workflowId: string
}

async function ExecutionTableWrapper({ workflowId }: ExecutionTableWrapperProps) {
  const initialExecutions = await getWorkflowExecutions(workflowId);
  // console.log({ workflowId, initialExecutions });
  if (!initialExecutions) {
    return (
      <Alert variant="destructive" className="font-semibold text-base">
        <AlertTitle>No Executions Available</AlertTitle>
        <AlertDescription>
          We couldn&apos;t find any execution records for this workflow. Please verify the workflow configuration and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (initialExecutions.length === 0) {
    return (
      <Alert variant="destructive" className="font-semibold text-base">
        <AlertTitle>Empty Execution History</AlertTitle>
        <AlertDescription>
          This workflow hasn&apos;t been executed yet. Start a new execution to see the results here.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ExecutionsTable workflowId={workflowId} initialData={initialExecutions} />
  )
}
