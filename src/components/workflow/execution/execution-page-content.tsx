"use client";

import { getWorkflowExecutionPhaseDetailsAction } from "@/actions/workflow/get-execution-phase-details";
import { getWorkflowExecutionWithPhasesAction } from "@/actions/workflow/get-workflow-execution-with-phases-action";
import { useState } from "react";
import Topbar from "../topbar/topbar";
import ExecutionViewer from "./execution-viewer";

type ExecutionPageContentProps = {
  initialData: Awaited<ReturnType<typeof getWorkflowExecutionWithPhasesAction>>;
  workflowId: string;
};

export default function ExecutionPageContent({ initialData, workflowId }: ExecutionPageContentProps) {
  const [phaseDetails, setPhaseDetails] = useState<Awaited<ReturnType<typeof getWorkflowExecutionPhaseDetailsAction>> | null>(null);

  return (
    <div className="grid h-full w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <div className="row-span-2 overflow-hidden">
        <ExecutionViewer
          initialData={initialData}
          setPhaseDetails={setPhaseDetails}
        />
      </div>

      <div className="col-start-2">
        <Topbar
          workflowId={workflowId}
          title="Execution"
          subtitle={`${initialData.id}`}
          hideButtons={true}
        />
      </div>

      <div className="col-start-2 overflow-auto">
        <div className="h-full min-w-fit flex flex-col items-center ">
          {phaseDetails ? (
            // Render phase details here
            <div className="min-w-full">
              < pre > {JSON.stringify(phaseDetails, null, 2)}</pre>
            </div>
          ) : (
            <h2 className="text-2xl font-bold">Select a phase to view details</h2>
          )}
        </div>
      </div >
    </div >
  );
}
