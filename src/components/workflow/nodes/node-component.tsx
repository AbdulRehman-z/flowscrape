import { NodeProps } from "@xyflow/react"
import { memo } from "react"
import NodeCard from "./node-card"
import NodeHeader from "./node-header"
import { AppNodeDataType } from "@/types/app-node-types"
import NodeInputs, { NodeInput } from "./node-inputs"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import NodeOutputs, { NodeOutput } from "./node-output"
import { Badge } from "@/components/ui/badge"

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeDataType
  const task = TaskREgistery[nodeData.type]

  return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
    <Badge className="w-ful">{props.id}</Badge>
    <NodeHeader taskType={nodeData.type} nodeId={props.id} />
    <NodeInputs>
      {task.inputs.map((input) =>
        <NodeInput key={input.name} nodeId={props.id} input={input} />
      )}
    </NodeInputs>

    <NodeOutputs>
      {task.outputs.map((output) =>
        <NodeOutput key={output.name} nodeId={props.id} output={output} />
      )}
    </NodeOutputs>
  </NodeCard>
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"
