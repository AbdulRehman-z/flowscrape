import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useUpdateWorkflow } from "@/hooks/workflow/use-update-workflow";
import { useReactFlow } from "@xyflow/react";
import { ArrowUpFromLine, LoaderIcon } from "lucide-react";

type PublishButtonProps = {
  workflowId: string
}
export default function PublishButton({ workflowId }: PublishButtonProps) {
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
          <ArrowUpFromLine size={20} />
          Publish
        </>}
      </Button>
    </TooltipWrapper >
  )
}
