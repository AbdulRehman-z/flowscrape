import { deleteWorkflowAction } from "@/actions/workflow/delete-workflow-action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"

export const useDeleteWorkflow = function () {

  const { mutate: deleteWorkflow, isPending: isDeletingWorkflow } = useMutation({
    mutationFn: (id: string) => deleteWorkflowAction(id),
    onSuccess: () => {
      toast.success("Workflow deleted successfully");
    },
    onError: () => {
      toast.error("Could not delete workflow");
    },
  })

  return { deleteWorkflow, isDeletingWorkflow };
};
