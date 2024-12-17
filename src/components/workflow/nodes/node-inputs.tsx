import { cn } from "@/lib/utils"
import { TaskParam } from "@/types/task-type"
import { Handle, Position } from "@xyflow/react"
import { ReactNode } from "react"

type NodeInputsProps = {
  children: ReactNode
}

export default function NodeInputs({ children }: NodeInputsProps) {
  return <div className="flex flex-col gap-2 divide-y">
    {children}
  </div>
}

type NodeInputProps = {
  input: TaskParam
}

export function NodeInput({ input }: NodeInputProps) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <pre>{JSON.stringify(input, null, 4)}</pre>
      {!input.hideHanlde && (<Handle
        id={input.name}
        type="target"
        position={Position.Left}
        className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !size-4")}
      />)
      }
    </div>
  )
}
