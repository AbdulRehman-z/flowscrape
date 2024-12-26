import { AppNodeType } from "@/types/app-node-types"
import { AppNodeMissingInputsType, WorkflowExecutionPlanPhase, WorkflowExecutionPlanType } from "@/types/workflow-types"
import { Edge } from "@xyflow/react"
import { TaskREgistery } from "./task/task-registery"

export enum FlowToExecutionPLanValidationError {
  INVALID_INPUTS = "INVALID_INPUTS",
  MISSING_ENTRY_POINT = "MISSING_ENTRY_POINT"
}

export type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlanType
  errors?: {
    type: FlowToExecutionPLanValidationError
    invalidElements?: AppNodeMissingInputsType[]
  }
}

const getValidInputs = (node: AppNodeType, edges: Edge[], planned: Set<string>) => {
  const invalidInputs = []
  const inputs = TaskREgistery[node.data.type].inputs

  for (const input of inputs) {
    // console.log({ input })
    const inputValue = node.data.inputs[input.name]
    const inputValueProvided = inputValue?.length > 0
    if (inputValueProvided) {
      // this input is fine,so we can move on
      continue
    }


    // if the input is not provided by the user then we need to check if that input is linked to any output
    const incomingEdges = edges.filter((edge) => edge.target === node.id)
    const inputLinkedToOutput = incomingEdges.find((edge) => edge.targetHandle === input.name)
    const requiredInputProvidedByVisitedOutput = inputLinkedToOutput && input.required && planned.has(inputLinkedToOutput.source)


    if (requiredInputProvidedByVisitedOutput) {
      //the input is required and we have a valid value provided by a task that is already planned
      continue
    } else if (!input.required) {
      // if the input is not required but is linked to an output then we need to check if that output is planned
      if (!inputLinkedToOutput) {
        continue
      } if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // the output is planned and also providing a valid value to the input //so we can move on
        continue
      }
    }
    invalidInputs.push(input.name)
  }
  return invalidInputs
}

function getIncomers(node: AppNodeType, nodes: AppNodeType[], edges: Edge[]) {
  if (!node.id) {
    return []
  }

  const incomersIds = new Set()
  edges.forEach((edge) => {
    if (edge.target === node.id) {  // FIXED: Check target instead of edge.id
      incomersIds.add(edge.source)
    }
  })

  return nodes.filter((n) => incomersIds.has(n.id))
}

export const FlowToExecutionPlan = (nodes: AppNodeType[], edges: Edge[]): FlowToExecutionPlanType => {
  const entryPoint = nodes.find((node) => TaskREgistery[node.data.type].isEntryPoint)

  if (!entryPoint) {
    throw new Error("Entry point is not allowed")
  }

  const invalidInputsWithErrors: AppNodeMissingInputsType[] = []
  const planned = new Set<string>()
  const invalidInputs = getValidInputs(entryPoint, edges, planned)
  if (invalidInputs.length > 0) {
    invalidInputsWithErrors.push({
      nodeId: entryPoint.id,
      inputs: invalidInputs
    })
  }
  const executionPlan: WorkflowExecutionPlanType = [
    {
      phase: 1,
      nodes: [entryPoint]
    }
  ]

  planned.add(entryPoint.id)

  for (let phase = 2; phase <= nodes.length && planned.size < nodes.length; phase++) {
    const nextPhase: WorkflowExecutionPlanPhase = { phase, nodes: [] }
    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) {
        // Node already put in the execution plan
        continue
      }

      const invalidInputs = getValidInputs(currentNode, edges, planned)

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges)
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // if all incoming incomers/edges are planned and there are still invalid inputs this means that this particular node has an invalid input which means that the workflow is invalid
          invalidInputsWithErrors.push({
            nodeId: currentNode.id,
            inputs: invalidInputs
          })
        } else {
          //  lets skip this node for now
          continue
        }
      }
      nextPhase.nodes.push(currentNode)
    }

    for (const node of nextPhase.nodes) {
      planned.add(node.id)
    }

    if (nextPhase.nodes.length > 0) {
      executionPlan.push(nextPhase)
    }
  }

  if (invalidInputsWithErrors.length > 0) {
    return {
      errors: {
        type: FlowToExecutionPLanValidationError.INVALID_INPUTS,
        invalidElements: invalidInputsWithErrors
      }
    }
  }

  return { executionPlan }
}
