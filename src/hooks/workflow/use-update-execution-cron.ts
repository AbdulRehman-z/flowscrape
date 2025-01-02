import { updateWorkflowCronAction } from "@/actions/workflow/update-workflow-cron"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpdateExecutionCron = () => {
  const { mutate: updateExecutionCron, isPending: isUpdatingExecutionCron } = useMutation({
    mutationFn: updateWorkflowCronAction,
    onSuccess: () => {
      toast.success("scheduled successfully", {
        id
          : "execution-schedule"
      })
    },
    onError: (error) => {
      console.error(error)
      toast.error("something went wrong", {
        id
          : "execution-schedule"
      })
    }
  })

  return {
    updateExecutionCron, isUpdatingExecutionCron
  }
}
