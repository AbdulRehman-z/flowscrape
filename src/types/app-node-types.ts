import type { Node } from "@xyflow/react"
import { TaskType } from "./task-type"

export type AppNodeData = {
  type: TaskType
  inputs: Record<string, string>
  [key: string]: any
}

export interface AppNode extends Node {
  data: AppNodeData
}
