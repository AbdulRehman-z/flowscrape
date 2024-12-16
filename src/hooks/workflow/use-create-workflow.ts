import { createWorkflowAction } from "@/actions/workflow/create-workflow-action";
import { CreateWorkflowSchemaType } from "@/schemas/workflow-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useCreateWorkflow = function () {
  const queryClient = useQueryClient();
  // const router = useRouter();
  const { mutate: createWorkflow, isPending: isCreatingWorkflow } = useMutation({
    mutationFn: (data: CreateWorkflowSchemaType) => createWorkflowAction(data),
    onSuccess: () => {
      toast.success("Workflow created successfully");
      queryClient.invalidateQueries({
        queryKey: ["workflows"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { createWorkflow, isCreatingWorkflow };
};
