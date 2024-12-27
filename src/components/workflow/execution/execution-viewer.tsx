"use client";

import { getWorkflowExecutionPhaseDetailsAction } from "@/actions/workflow/get-execution-phase-details";
import { getWorkflowExecutionWithPhasesAction } from "@/actions/workflow/get-workflow-execution-with-phases-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader } from "@/components/ui/sidebar";
import { DatesToDurationString, getTotalCreditsConsumedByPhasesInWorkflow } from "@/lib/utils";
import { WorkflowExecutionStatusEnum } from "@/types/workflow-types";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, CircleDashedIcon, ClockIcon, KeyIcon, Loader2Icon, LucideIcon } from "lucide-react";
import { ReactNode, useEffect } from "react";


type ExecutionViewerProps = {
  initialData: Awaited<ReturnType<typeof getWorkflowExecutionWithPhasesAction>>;
  setPhaseDetails: React.Dispatch<React.SetStateAction<Awaited<ReturnType<typeof getWorkflowExecutionPhaseDetailsAction>> | null>>;
  selectedPhase: string | null;
  setSelectedPhase: React.Dispatch<React.SetStateAction<string | null>>;
  setQueryState: React.Dispatch<React.SetStateAction<string>>;
}

export default function ExecutionViewer({ initialData, setPhaseDetails, selectedPhase, setSelectedPhase, setQueryState }: ExecutionViewerProps) {
  // const [selectedPhase, setSelectedPhase] = useState<null | string>(null);

  const query = useQuery({
    queryKey: ["execution", initialData.id],
    queryFn: () => getWorkflowExecutionWithPhasesAction(initialData.id),
    initialData,
    refetchInterval: (q) => q.state.data?.status === "RUNNING" ? 1000 : false,
  })

  const phaseDetails = useQuery({
    queryKey: ["phaseDetails", selectedPhase],
    queryFn: () => getWorkflowExecutionPhaseDetailsAction(selectedPhase!),
    enabled: selectedPhase !== null,
  });

  useEffect(() => {
    if (phaseDetails.data) {
      setPhaseDetails(phaseDetails.data);
      setQueryState("");
    }
  }, [phaseDetails.data, setPhaseDetails, setQueryState])

  function handlePhaseClick(phaseId: string) {
    setSelectedPhase(phaseId);
    setQueryState("RUNNING");
  }

  const duration = DatesToDurationString(query.data?.completedAt, query.data?.startedAt);

  return (
    <Sidebar collapsible="none" className="hidden border-r py-2 px-4 h-full md:flex w-[400px]">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-center">
          <div className="text-base font-medium text-foreground">
            <h1 className="text-2xl font-semibold">Execution Details</h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-1 py-4">
          <SidebarGroupLabel className="my-3 text-sm">
            Workflow execution status
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-y-5">
              <ExecutionLabel icon={CircleDashedIcon} label="Status" value={query.data?.status} />
              <ExecutionLabel icon={CalendarIcon} label="Started at" value={<span>
                {
                  query.data?.startedAt ? formatDistanceToNow(query.data.startedAt, {
                    addSuffix: true
                  }) : "_"
                }
              </span>} />
              <ExecutionLabel icon={ClockIcon} label="Duration" value={
                <span>{
                  duration ? duration : <Loader2Icon size={20} className="animate-spin" />
                }</span>
              } />
              <ExecutionLabel icon={KeyIcon} label="Credits Consumed" value={getTotalCreditsConsumedByPhasesInWorkflow((query.data?.phases as any) || [])} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="px-1 py-4 ">
          <SidebarGroupLabel className="my-3 text-sm">
            Phases
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-y-1 overflow-y-auto">
              {query.data?.phases?.map((phase, index) => (
                <Button disabled={phaseDetails.isLoading && selectedPhase === phase.id || query.data.status === WorkflowExecutionStatusEnum.RUNNING || query.data.status === WorkflowExecutionStatusEnum.PENDING} key={index} onClick={() => handlePhaseClick(phase.id)} variant={selectedPhase === phase.id ? "secondary" : "ghost"} className="flex justify-between items-center w-full px-3">
                  <div className="flex w-full justify-center  items-center">
                    {phaseDetails.isLoading && selectedPhase === phase.id ? <Loader2Icon size={20} className="animate-spin" /> : <div className="flex items-center justify-between w-full gap-x-2">
                      <div className="flex items-center gap-x-2">
                        <Badge variant={"outline"} className="rounded-full w-fit" >{index + 1}</Badge>
                        <span className="text-sm font-medium">{phase.name}</span>
                      </div>
                      <span className="text-muted-foreground">{phase.status}</span>
                    </div>}
                  </div>
                </Button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent >
    </Sidebar >
  )
}

type ExecutionLabelProps = {
  icon: LucideIcon,
  label: ReactNode,
  value: ReactNode,
}

function ExecutionLabel({ icon, label, value }: ExecutionLabelProps) {
  const Icon = icon;
  // console.log({ label })
  return (
    <div className="flex gap-2 items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Icon size={20} />
        <p className="text-sm font-medium">{label}</p>
      </div>
      <div>
        <div className="text-sm text-gray-500">{value === WorkflowExecutionStatusEnum.RUNNING ? <span className="animate-spin">
          <Loader2Icon className="animate-spin" size={20} />
        </span> : value}</div>
      </div>
    </div>
  );
}
