import { AppNodeType } from "@/types/app-node-types"
import { TaskParamEnum, TaskParamType } from "@/types/task-type"
import { useReactFlow } from "@xyflow/react"
import { useCallback } from "react"
import StringParam from "./param/string-param"
import BrowserInstanceParam from "./param/browser-instance-param"

type NodeParamFieldProps = {
  param: TaskParamType
  nodeId: string
  disabled: boolean
}

export default function NodeParamField({ param, nodeId, disabled }: NodeParamFieldProps) {

  const { updateNodeData, getNode } = useReactFlow()
  const node = getNode(nodeId) as AppNodeType
  const inputValue = node?.data?.inputs?.[param.name]
  const updateNodeParamValue = useCallback((newValue: string) => {
    updateNodeData(nodeId, {
      inputs: {
        ...node?.data.inputs,
        [param.name]: newValue
      }
    })
  }, [nodeId, node, param.name, updateNodeData])


  switch (param.type) {
    case TaskParamEnum.STRING:
      return <StringParam param={param} inputValue={inputValue} updateNodeParamValue={updateNodeParamValue} disabled={disabled} />
    case TaskParamEnum.BROWSER_INSTANCE:
      return <BrowserInstanceParam param={param} inputValue={""} updateNodeParamValue={updateNodeParamValue} />
    default:
      return (
        <p className="text-sm text-muted-foreground">No param passed</p>
      )
  }
}
