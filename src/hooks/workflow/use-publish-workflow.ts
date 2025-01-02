import { publishWorkflowAction } from "@/actions/workflow/publish-workflow"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const usePublishWorkflow = () => {
  const { mutate: publishWorkflow, isPending: isPublishing } = useMutation({
    mutationFn: publishWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow published successfully", { id: "workflow-publish" })
    },
    onError: (error) => {
      console.error(error)
      toast.error("Error publishing workflow", { id: "workflow-publish" })
    },
  })

  return {
    publishWorkflow,
    isPublishing,
  }
}
