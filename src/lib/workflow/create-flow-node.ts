import { AppNode } from "@/types/app-node-types";
import { TaskType } from "@/types/task-type";

export const createFlowNode = (nodeType: TaskType, position?: { x: number, y: number }): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: "FlowScrapeNode",
    data: {
      type: nodeType,
      inputs: {},
      inouts: {}
    },
    position: position ?? { x: 0, y: 0 }
  }
}
