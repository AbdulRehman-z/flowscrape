import { AppNodeType } from "@/types/app-node-types"
import { WorkflowExecutionPlanPhase, WorkflowExecutionPlanType } from "@/types/workflow-types"
import { Edge, getIncomers } from "@xyflow/react"
import { TaskREgistery } from "./task/task-registery"

type FlowToExecutionPlanType = {
  executionPlan?: WorkflowExecutionPlanType
}

const getValidInputs = (node: AppNodeType, edges: Edge[], planned: Set<string>) => {
  const invalidInputs = []
  const inputs = TaskREgistery[node.data.type].inputs
  console.log({ inputs, node })
  for (const input of inputs) {
    // console.log({ input })
    const inputValue = node.data.inputs[input.name]
    // console.log("inputValue", { inputValue })
    const inputValueProvided = inputValue?.length > 0
    if (inputValueProvided) {
      // this input is fine,so we can move on
      continue
    }

    // if the input is not provided by the user then we need to check if that input is linked to any output
    const filteredEdges = edges.filter((edge) => edge.target === node.id)
    const inputLinkedToOutput = filteredEdges.find((edge) => edge.targetHandle === input.name)

    const requiredInputProvidedByVisitedOutput = inputLinkedToOutput && input.required && planned.has(inputLinkedToOutput.source)

    if (requiredInputProvidedByVisitedOutput) {
      //the input is required and we have a valid value provided by a task that is already planned
      continue
    } else if (!input.required) {
      // if the input is not required but is linked to an output then we need to check if that output is planned
      if (!inputLinkedToOutput) continue
      if (inputLinkedToOutput && planned.has(inputLinkedToOutput.source)) {
        // the output is planned and also providing a valid value to the input //so we can move on
        continue
      }
    }
    invalidInputs.push(input.name)
  }
  return invalidInputs
}

export const FlowToExecutionPlan = (nodes: AppNodeType[], edges: Edge[]): FlowToExecutionPlanType => {
  const entryPoint = nodes.find((node) => TaskREgistery[node.data.type].isEntryPoint)

  if (!entryPoint) {
    throw new Error("Entry point is not allowed")
  }

  const planned = new Set<string>()
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
      console.log({ invalidInputs })

      if (invalidInputs.length > 0) {
        const incomers = getIncomers(currentNode, nodes, edges)
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          // if all incoming incomers/edges are planned and there are still invalid inputs this means that this particular node has an invalid input which means that the workflow is invalid
          console.log("invalid inputs", currentNode.id, invalidInputs)
          throw new Error("TODO: HANDLE ERROR 1")
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

  return { executionPlan }
}
