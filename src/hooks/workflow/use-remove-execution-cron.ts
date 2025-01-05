import {
  removeExecutionCronAction,
} from "@/actions/workflow/remove-execution-cron"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useRemoveExecutionCron = () => {
  const { isPending: isRemovingExecutionCron, mutate: removeExecutionCron } = useMutation({
    mutationFn: removeExecutionCronAction,
    onSuccess: () => {
      toast.success("Cron removed successfully")
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to remove cron")
    },
  })

  return {
    isRemovingExecutionCron,
    removeExecutionCron,
  }
}
