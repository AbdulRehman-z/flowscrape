
import { FlowToExecutionPlan } from "@/lib/workflow/execution-plan"
import { AppNodeType } from "@/types/app-node-types"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"

export const useExecutionPlan = () => {
  const { toObject } = useReactFlow()

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject()
    const { executionPlan } = FlowToExecutionPlan(nodes as AppNodeType[], edges)

    return executionPlan
  }, [toObject])

  return generateExecutionPlan
}
