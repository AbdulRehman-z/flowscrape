import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { usePublishWorkflow } from "@/hooks/workflow/use-publish-workflow";
import { useReactFlow } from "@xyflow/react";
import { ArrowUpFromLine, LoaderIcon } from "lucide-react";
import { toast } from "sonner";

type PublishButtonProps = {
  workflowId: string
}

export default function PublishButton({ workflowId }: PublishButtonProps) {
  const { toObject } = useReactFlow()
  // const { updateWorkflow, isUpdatingWorkflow } = useUpdateWorkflow()
  const { publishWorkflow, isPublishing } = usePublishWorkflow()

  function handlePublishClick() {
    const defination = JSON.stringify(toObject())
    toast.loading("publishing...", { id: "workflow-publish" })

    publishWorkflow({
      id: workflowId,
      flowDefination: defination,
    })
  }

  return (
    <TooltipWrapper tooltipContent="Publish workflow">
      <Button onClick={handlePublishClick}
        disabled={isPublishing}
      >
        {isPublishing ? <LoaderIcon className="animate-spin" /> : <>
          <ArrowUpFromLine size={20} />
          Publish
        </>}
      </Button>
    </TooltipWrapper >
  )
}
