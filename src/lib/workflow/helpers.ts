import { AppNodeType } from "@/types/app-node-types";
import { TaskREgistery } from "./task/task-registery";
/**
 * Calculates the total credit cost of a workflow by summing up the credit costs of all nodes.
 * @param nodes Array of workflow nodes to calculate costs for
 * @returns Total credit cost of the workflow
 */
export const CalculateWorkflowCost = (nodes: AppNodeType[]) => {
  return nodes.reduce((acc, node) => TaskREgistery[node.data.type].credits + acc, 0
  );
};
