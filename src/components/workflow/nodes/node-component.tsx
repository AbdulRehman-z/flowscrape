import { NodeProps } from "@xyflow/react"
import { memo } from "react"
import NodeCard from "./node-card"
import NodeHeader from "./node-header"
import { AppNodeData } from "@/types/app-node-types"
import NodeInputs, { NodeInput } from "./node-inputs"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData
  const task = TaskREgistery[nodeData.type]
  console.log({ props })


  return <NodeCard nodeId={props.id} isSelected={!!props.selected}>
    <NodeHeader taskType={nodeData.type} />
    <NodeInputs>
      {task.inputs.map((input) =>
        <NodeInput key={input.name} input={input} />
      )}
    </NodeInputs>
  </NodeCard>
})

export default NodeComponent
NodeComponent.displayName = "NodeComponent"
