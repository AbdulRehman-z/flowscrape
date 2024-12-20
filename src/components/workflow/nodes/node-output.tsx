import { cn } from "@/lib/utils"
import { CommonColors } from "@/lib/workflow/common"
import { TaskParamType } from "@/types/task-type"
import { Handle, Position } from "@xyflow/react"
import { ReactNode } from "react"

type NodeOutputsProps = {
  children: ReactNode
}

export default function NodeOutputs({ children }: NodeOutputsProps) {
  return <div className="flex flex-col gap-1 divide-y">
    {children}
  </div>
}

type NodeOutputProps = {
  output: TaskParamType
  nodeId: string
}

export function NodeOutput({ output, nodeId }: NodeOutputProps) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary w-full">
      <p className="text-sm font-medium text-muted-foreground">
        {output.name}
        {nodeId}
      </p>
      <Handle
        id={output.name}
        position={Position.Right}
        type="source"
        className={cn("!bg-muted-foreground !border-2 !border-background !-right-2 !size-4", CommonColors[output.type])}
      />
    </div>
  )
}
