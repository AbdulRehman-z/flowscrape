"use client"

import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useExecutionPlan } from "@/hooks/workflow/use-execution-plan";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";

type ExecuteButtonProps = {
  workflowId: string
}


export default function ExecuteButton({ workflowId }: ExecuteButtonProps) {
  const generate = useExecutionPlan()

  function handleExecutionClick() {
    const plan = generate()
    console.log("--- PLAN ---")
    console.table(plan)
  }

  return (
    <TooltipWrapper tooltipContent="Execute workflow">
      <Button variant={"outline"} size={"icon"} onClick={handleExecutionClick}>
        <PlayIcon size={24} />
      </Button>
    </TooltipWrapper >
  )
}
