import { TooltipWrapper } from "@/components/tooltip-provider";
import { Button } from "@/components/ui/button";
import { useUnpublishWorkflow } from "@/hooks/workflow/use-unpublish-workflow";
import { LoaderIcon, UndoDot } from "lucide-react";
import { toast } from "sonner";

type UnPublishButtonProps = {
  workflowId: string
}

export default function UnPublishButton({ workflowId }: UnPublishButtonProps) {
  const { unpublishWorkflow, isUnpublishing } = useUnpublishWorkflow()

  function handlePublishClick() {
    toast.loading("unpublishing...", { id: "workflow-unpublish" })
    unpublishWorkflow(workflowId)
  }

  return (
    <TooltipWrapper tooltipContent="Un-Publish workflow">
      <Button onClick={handlePublishClick}
        disabled={isUnpublishing}
      >
        {isUnpublishing ? <LoaderIcon className="animate-spin" /> : <>
          <UndoDot size={20} />
          Un-Publish
        </>}
      </Button>
    </TooltipWrapper >
  )
}
