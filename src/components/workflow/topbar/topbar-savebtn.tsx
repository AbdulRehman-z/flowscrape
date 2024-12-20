// "use client"

import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useUpdateWorkflow } from "@/hooks/workflow/use-update-workflow";
import { useReactFlow } from "@xyflow/react";
import { LoaderIcon, SaveIcon } from "lucide-react";

type SaveButtonProps = {
  workflowId: string
}
export default function SaveButton({ workflowId }: SaveButtonProps) {
  const { toObject } = useReactFlow()
  const { updateWorkflow, isUpdatingWorkflow } = useUpdateWorkflow()

  function handleSave() {
    const defination = JSON.stringify(toObject())
    updateWorkflow({
      id: workflowId,
      defination
    })
  }

  return (
    <TooltipWrapper tooltipContent="Save workflow">
      <Button onClick={handleSave}
        disabled={!!isUpdatingWorkflow}
      >
        {isUpdatingWorkflow ? <LoaderIcon className="animate-spin" /> : <>
          <SaveIcon size={20} />
          Save
        </>}
      </Button>
    </TooltipWrapper >
  )
}
