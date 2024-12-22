import { useFlowValidationContext } from "@/contexts/useFlowValidationContext"
import { cn } from "@/lib/utils"
import { useReactFlow } from "@xyflow/react"
import { ReactNode } from "react"

type NodeCardProps = {
  children: ReactNode,
  nodeId: string,
  isSelected: boolean
}

export default function NodeCard({ children, isSelected, nodeId }: NodeCardProps) {
  const { getNode, setCenter } = useReactFlow()
  const { invalidInputs } = useFlowValidationContext()

  function handleDoubleClick() {
    const node = getNode(nodeId)
    if (!node) return
    const { position, measured } = node
    if (!position || !measured) return
    const { width, height } = measured
    const x = position.x + width! / 2
    const y = position.y + height! / 2
    if (x === undefined || y === undefined) return

    setCenter(x, y, {
      zoom: 1,
      duration: 500
    })
  }

  const infectedNode = invalidInputs.some((invalidInput) => invalidInput.nodeId === nodeId)

  return (
    <div onDoubleClick={handleDoubleClick} className={cn("rounded-md cursor-pointer  bg-background border-2 border-separate w-[420px] text-sm flex flex-col gap-1", isSelected && "border-primary", infectedNode && "border-red-500")}>
      {children}
    </div>
  )
}
