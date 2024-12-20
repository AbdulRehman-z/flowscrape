import type { Node } from "@xyflow/react"
import { TaskParamType, TaskTypeEnum } from "./task-type"

export type AppNodeDataType = {
  type: TaskTypeEnum
  inputs: Record<string, string>
  [key: string]: unknown
}

export interface AppNodeType extends Node {
  data: AppNodeDataType
}

export type ParamProps = {
  param: TaskParamType,
  inputValue: string,
  updateNodeParamValue: (newValue: string) => void
  disabled?: boolean
}
