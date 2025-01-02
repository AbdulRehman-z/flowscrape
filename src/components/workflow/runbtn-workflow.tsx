import { useExecutionPlanMutation } from "@/hooks/workflow/use-execution-plan";
import { PlayIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

type RunBtnWorkflowProps = {
  workflowId: string
  flowDefination: string
}
export default function RunBtnWorkflow({ workflowId, flowDefination }: RunBtnWorkflowProps) {
  const { executeWorkflow, isExecuting } = useExecutionPlanMutation()

  function handleClick() {
    toast.loading("Executing workflow...", { id: "run-workflow" })
    executeWorkflow({
      workflowId,
      flowDefination,
    })
  }

  return (
    <Button variant={"outline"} onClick={handleClick} disabled={isExecuting}>
      <PlayIcon size={16} />
      Run
    </Button>
  )
}
