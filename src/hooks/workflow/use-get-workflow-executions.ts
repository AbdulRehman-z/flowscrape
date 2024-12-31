import { getWorkflowExecutions } from "@/actions/workflow/get-workflow-executions"
import { useQuery } from "@tanstack/react-query"

export const useGetWorkflowExecutions = (workflowId: string, initialData: Awaited<ReturnType<typeof getWorkflowExecutions>>) => {
  const { data: executions, isLoading: isLoadingExecutions } = useQuery({
    queryKey: ['workflow-executions', workflowId],
    initialData,
    queryFn: () => getWorkflowExecutions(workflowId),
    refetchInterval: 1000 * 60 * 5, // 30 seconds
  })

  return {
    executions,
    isLoadingExecutions,
  }
}
