import { duplicateWorkflowAction } from "@/actions/workflow/duplicate-workflow-action"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useDuplicateWorkflow = () => {
  const { mutate: duplicateWorkflow, isPending: isDuplicating } = useMutation({
    mutationFn: duplicateWorkflowAction,
    onSuccess: () => {
      toast.success("workflow duplicated successfully", { id: "duplicate-workflow" })
    },
    onError: (error) => {
      console.error(error)
      toast.error("something went wrong", { id: "duplicate-workflow" })
    }
  })

  return {
    duplicateWorkflow,
    isDuplicating
  }
}
