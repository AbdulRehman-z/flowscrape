"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getWorkflowById } from "@/data/workflow/get-workflow";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow-types";
import { CoinsIcon, CornerDownRightIcon, EditIcon, EllipsisVertical, FileTextIcon, MoveRightIcon, PlayIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TooltipWrapper } from "../tooltip-provider";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { DeleteWorkflowDialog } from "./delete-workflow-dialog";
import RunBtnWorkflow from "./runbtn-workflow";
import SchedulerDialog from "./workflow-scheduler-dialog";

type WorkflowCardProps = {
  workflow: Awaited<ReturnType<typeof getWorkflowById>>
}

const statusColors = {
  [WorkflowStatus.DRAFT]: "bg-yellow-300 text-yellow-600",
  [WorkflowStatus.PUBLISHED]: "bg-green-300 text-green-600",
}


export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="flex flex-col justify-center h-32 hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-center">

          {/* Left side */}
          <div className="flex flex-col items-start gap-y-2">
            <div className="flex items-center gap-x-3 ">
              <div className={cn("flex items-center justify-center rounded-full bg-gray-50 h-12 w-12 shadow-sm", statusColors[workflow.status as WorkflowStatus])}>
                {isDraft ? <FileTextIcon className="size-6" /> : <PlayIcon className="size-6" />}
              </div>
              <div className="flex items-center space-x-3 text-base">
                <h3 className="font-medium">
                  <Link href={`/workflows/edit/${workflow.id}`} className="text-primary hover:underline hover:text-primary/80 transition-colors">
                    {workflow.name}
                  </Link>
                </h3>
                <Badge variant={"secondary"} className="text-sm rounded-full tracking-tight" >
                  {workflow.status}
                </Badge>
              </div>
            </div>
            <WorkflowSehdulerSection isDraft={isDraft} creditsCost={workflow.creditsCost} workflowId={workflow.id} cron={workflow.cron} />
          </div>

          {/* Right side */}
          <div className="flex space-x-2 flex-row items-center">
            <RunBtnWorkflow workflowId={workflow.id} flowDefination={workflow.defination} />
            <Button asChild variant={"outline"}>
              <Link href={`/workflows/editor/${workflow.id}`} className="">
                <EditIcon size={16} />
                Edit
              </Link>
            </Button>
            <WorkflowActions workflowId={workflow.id} workflowName={workflow.name} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


type WorkflowActionsProps = {
  workflowId: string,
  workflowName: string
}

function WorkflowActions({ workflowId, workflowName }: WorkflowActionsProps) {
  const [showDeleteWorkflowDialog, setShowDeleteWorkflowDialog] = useState(false)

  return (
    <>
      <DeleteWorkflowDialog
        open={showDeleteWorkflowDialog}
        setOpen={setShowDeleteWorkflowDialog}
        workflowId={workflowId}
        workflowName={workflowName}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="px-0" size="sm" variant="outline">
            <TooltipWrapper tooltipContent="More actions">
              <div className="flex px-3 items-center justify-center h-full w-full">
                <EllipsisVertical size={18} />
              </div>
            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger >
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center space-x-2" onSelect={
            () => {
              setShowDeleteWorkflowDialog((prev) => !prev)
            }
          }>
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  )
}

type WorkflowSchedulerSectionProps = {
  isDraft: boolean,
  creditsCost: number,
  workflowId: string
  cron: string | null
}


function WorkflowSehdulerSection({ isDraft, creditsCost, workflowId, cron }: WorkflowSchedulerSectionProps) {

  if (isDraft) return null
  return (
    <div className="flex items-center gap-x-1 ml-3">
      <CornerDownRightIcon className="size-6 -mt-2 text-muted-foreground" />
      <SchedulerDialog workflowId={workflowId} savedCron={cron} key={`${cron}-${workflowId}`} />
      <MoveRightIcon className="size-4 text-muted-foreground" />
      <TooltipWrapper tooltipContent="Credit consumption for full run">
        <div className="flex items-center gap-3">
          <Badge variant={"outline"} className="space-x-2 text-muted-foreground rounded-sm">
            <CoinsIcon className="size-4" />
            <span className="text-sm">{creditsCost}</span>
          </Badge>
        </div>
      </TooltipWrapper>
    </div>
  )
}
