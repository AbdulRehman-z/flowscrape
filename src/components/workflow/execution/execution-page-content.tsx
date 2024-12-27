"use client";

import { getWorkflowExecutionPhaseDetailsAction } from "@/actions/workflow/get-execution-phase-details";
import { getWorkflowExecutionWithPhasesAction } from "@/actions/workflow/get-workflow-execution-with-phases-action";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { LogLevel } from "@/types/log.types";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import Topbar from "../topbar/topbar";
import ExecutionViewer from "./execution-viewer";
import ParameterViewer from "./parameter-viewer";

type ExecutionPageContentProps = {
  initialData: Awaited<ReturnType<typeof getWorkflowExecutionWithPhasesAction>>;
  workflowId: string;
};

export default function ExecutionPageContent({ initialData, workflowId }: ExecutionPageContentProps) {
  const [phaseDetails, setPhaseDetails] = useState<Awaited<ReturnType<typeof getWorkflowExecutionPhaseDetailsAction>> | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<null | string>(null);
  const [queryState, setQueryState] = useState("")

  return (
    <div className="grid h-full w-full grid-cols-[auto_1fr] grid-rows-[auto_1fr]">

      {/* sidebar */}
      <div className="row-span-2 overflow-hidden">
        <ExecutionViewer
          setQueryState={setQueryState}
          selectedPhase={selectedPhase}
          setSelectedPhase={setSelectedPhase}
          initialData={initialData}
          setPhaseDetails={setPhaseDetails}
        />
      </div>

      {/* topbar */}
      <div className="col-start-2">
        <Topbar
          workflowId={workflowId}
          title="Execution"
          subtitle={`${initialData.id}`}
          hideButtons={true}
        />
      </div>

      {/* main content */}
      <div className="col-start-2 overflow-auto">
        {
          queryState === "RUNNING" && (
            <div className="h-full w-full flex items-center justify-center ">
              <div className="flex items-center justify-center shadow-md">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin">
                    <Loader2Icon size={25} />
                  </div>
                  <p className="text-base font-medium text-muted-foreground">Loading phase data, please be patient...</p>
                </div>
              </div>
            </div>
          )
        }
        {
          !selectedPhase && queryState !== "RUNNING" && (
            <div className="flex w-full h-full flex-col items-center justify-center">
              <div className="flex flex-col text-center space-y-2 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold">Select Execution Phase</h1>
                <p className="text-base font-medium text-muted-foreground">Select a phase from the sidebar to view detailed information</p>
              </div>
            </div>
          )
        }

        <div className="px-10 py-7 flex flex-col gap-y-4">
          <ParameterViewer title="Inputs" subtitle="Inputs used for this phase" paramJson={phaseDetails?.inputs || undefined} />
          <ParameterViewer title="Outputs" subtitle="Outputs used for this phase" paramJson={phaseDetails?.outputs || undefined} />
          <LogsViewer logs={phaseDetails?.logs || []} />
        </div>

      </div >
    </div >
  );
}

type LogsViewerProps = {
  logs: Array<{
    id: string;
    timestamp: Date;
    logLevel: string;
    message: string;
  }>;
};

function LogsViewer({
  logs
}: LogsViewerProps) {

  return <Card className="w-1/2 shadow-none">
    <CardHeader className="bg-sidebar border-b-2 ">
      <CardTitle>
        Logs
      </CardTitle>
      <CardDescription>
        Logs generated by this phase
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-3">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            logs.map((log) => (
              <TableRow key={log.id.toString()}>
                <TableCell width={190} className="text-sm text-muted-foreground">{log.timestamp.toString()}</TableCell>
                <TableCell width={80} className={cn("uppercase text-xs font-bold", (log.logLevel as LogLevel === "error" && "text-destructive"),
                  (log.logLevel as LogLevel === "info" && "text-primary"),
                )}>{log.logLevel.toString()}</TableCell>
                <TableCell>{log.message.toString()}</TableCell>
              </TableRow>
            ))
          }
          {logs.length < 0 && <p className="text-sm text-muted-foreground">No  logs for this phase.</p>}
        </TableBody>
      </Table>
    </CardContent>
  </Card>;
}
