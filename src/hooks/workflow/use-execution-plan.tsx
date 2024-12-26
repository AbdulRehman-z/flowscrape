import { runWorkflowAction } from "@/actions/workflow/run-workflow-action"
import { useFlowValidationContext } from "@/contexts/useFlowValidationContext"
import { FlowToExecutionPlan, FlowToExecutionPlanType, FlowToExecutionPLanValidationError } from "@/lib/workflow/execution-plan"
import { AppNodeType } from "@/types/app-node-types"
import { useMutation } from "@tanstack/react-query"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import { toast } from "sonner"

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow()
  const { setInvalidInputs, clearInputErrors } = useFlowValidationContext()

  const handleError = useCallback((error: FlowToExecutionPlanType["errors"]) => {
    switch (error?.type) {
      case FlowToExecutionPLanValidationError.INVALID_INPUTS:
        setInvalidInputs(error.invalidElements!)
        break
      case FlowToExecutionPLanValidationError.MISSING_ENTRY_POINT:
        clearInputErrors()
        break
      default:
        throw new Error("Unknown error type")
        break
    }
  }, [setInvalidInputs, clearInputErrors])

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject()
    const { executionPlan, errors } = FlowToExecutionPlan(nodes as AppNodeType[], edges)


    if (errors) {
      handleError(errors)
      return null
    }

    clearInputErrors()
    return executionPlan
  }, [toObject, handleError, clearInputErrors])

  return generateExecutionPlan
}


export const useExecutionPlanMutation = () => {
  const { mutate: executeWorkflow, isPending: isExecuting } = useMutation({
    mutationFn: runWorkflowAction,
    onSuccess: () => {
      toast.success("Workflow executed successfully")
    },
    onError: (error) => {
      console.error("error", error)
      toast.error("Error executing workflow")
    }
  })

  return { executeWorkflow, isExecuting }
}
