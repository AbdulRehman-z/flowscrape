import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createFlowNode } from "@/lib/workflow/create-flow-node"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { AppNodeType } from "@/types/app-node-types"
import { TaskTypeEnum } from "@/types/task-type"
import { useReactFlow } from "@xyflow/react"
import { CoinsIcon, CopyIcon, GripVerticalIcon, Trash2Icon } from "lucide-react"

type NodeHeaderProps = {
  taskType: TaskTypeEnum
  nodeId: string
}

export default function NodeHeader({ taskType, nodeId }: NodeHeaderProps) {
  const task = TaskREgistery[taskType]
  const { getNode, addNodes, deleteElements } = useReactFlow()

  function handleNodeDelete() {
    deleteElements({
      nodes: [{ id: nodeId }]
    })
  }

  function handleNodeCopy() {
    const node = getNode(nodeId) as AppNodeType
    const position = {
      x: node.position.x + (node.measured?.width ?? 0) + 10,
      y: node.position.y + (node.measured?.height ?? 0) + 10
    }

    const newNode = createFlowNode(taskType, position)
    addNodes([newNode])
  }

  return (
    <div className="flex items-center gap-2 p-2 ">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full gap-x-2">
        <p className="text-xs font-bold uppercase text-muted-foreground">{task.label}</p>
        <div className="flex items-center gap-x-1 text-xs">
          {task.isEntryPoint && <Badge>
            Entry point
          </Badge>}
          <Badge className="gap-x-2 text-xs">
            <CoinsIcon size={16} />
            {task.credits}
          </Badge>
          {!task.isEntryPoint &&
            <>
              <Button size="icon" variant={"outline"} onClick={handleNodeDelete} >
                <Trash2Icon size={16} />
              </Button>

              <Button size="icon" variant={"outline"} onClick={handleNodeCopy} >
                <CopyIcon size={16} />
              </Button>

            </>}
          <Button className="cursor-grab drag-handle" size={"icon"} variant={"ghost"}>
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
