import { useQuery } from "@tanstack/react-query";
import { getWorkflowsAction } from "@/actions/workflow/get-workflow-action";

export const useGetWorkflows = function () {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["workflows"],
    queryFn: getWorkflowsAction,
  });

  return { data, isLoading, isError };
};
