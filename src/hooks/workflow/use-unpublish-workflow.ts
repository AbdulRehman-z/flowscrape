import { unpublishWorkflowAction } from "@/actions/workflow/unpublish-workflow-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUnpublishWorkflow = () => {
  const { mutate: unpublishWorkflow, isPending: isUnpublishing } = useMutation({
    mutationFn: unpublishWorkflowAction,
    onSuccess: () => {
      toast.success("workflow unpublished successfully", { id: "workflow-unpublish" })
    },
    onError: (error) => {
      console.error(error)
      toast.error("something went wrong", { id: "workflow-unpublish" })
    }
  })

  return {
    unpublishWorkflow,
    isUnpublishing
  }
}
