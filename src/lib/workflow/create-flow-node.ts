import { AppNodeType } from "@/types/app-node-types";
import { TaskTypeEnum } from "@/types/task-type";

export const createFlowNode = (nodeType: TaskTypeEnum, position?: { x: number, y: number }): AppNodeType => {
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
