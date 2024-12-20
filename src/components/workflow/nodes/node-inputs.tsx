import { cn } from "@/lib/utils"
import { TaskParamType } from "@/types/task-type"
import { Handle, Position, useEdges } from "@xyflow/react"
import { ReactNode } from "react"
import NodeParamField from "./node-param-field"
import { CommonColors } from "@/lib/workflow/common"

type NodeInputsProps = {
  children: ReactNode
}

export default function NodeInputs({ children }: NodeInputsProps) {
  return <div className="flex flex-col gap-2 divide-y">
    {children}
  </div>
}

type NodeInputProps = {
  input: TaskParamType
  nodeId: string
}

export function NodeInput({ input, nodeId }: NodeInputProps) {
  const edges = useEdges()
  const isConnected = edges.some(edge => edge.target === nodeId && edge.targetHandle === input.name)


  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandler && <Handle
        id={input.name}
        type="target"
        isConnectable={!isConnected}
        position={Position.Left}
        className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !size-4", CommonColors[input.type])}
      />
      }
    </div>
  )
}
