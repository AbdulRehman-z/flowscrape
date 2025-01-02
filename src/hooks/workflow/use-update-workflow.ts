import { updateWorkflowAction } from "@/actions/workflow/update-workflow-action"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateWorkflow = () => {
  const queryClient = useQueryClient()

  const { mutate: updateWorkflow, isPending: isUpdatingWorkflow } = useMutation({
    mutationFn: ({ id, defination }: { id: string; defination: string }) => updateWorkflowAction(id, defination),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getWorkflowById"]
      })
      toast.success("Workflow saved successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return { updateWorkflow, isUpdatingWorkflow }
}
