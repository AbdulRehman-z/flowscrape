"use client"

import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useExecutionPlan, useExecutionPlanMutation } from "@/hooks/workflow/use-execution-plan";
import { useReactFlow } from "@xyflow/react";
import { Loader2Icon, PlayIcon } from "lucide-react";

type ExecuteButtonProps = {
  workflowId: string
}

export default function ExecuteButton({ workflowId }: ExecuteButtonProps) {
  const generate = useExecutionPlan()
  const { toObject } = useReactFlow()
  const { executeWorkflow, isExecuting } = useExecutionPlanMutation()

  function handleExecutionClick() {
    const plan = generate()
    if (!plan) return

    executeWorkflow({
      workflowId,
      defination: JSON.stringify(toObject())
    })
  }

  return (
    <TooltipWrapper tooltipContent="Execute workflow">
      <Button variant={"secondary"} onClick={handleExecutionClick} disabled={isExecuting}>
        {isExecuting ? <Loader2Icon className="animate-spin" /> : <>
          <PlayIcon size={24} />
          Execute
        </ >}
      </Button>
    </TooltipWrapper >
  )
}
