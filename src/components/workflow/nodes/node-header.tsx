import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { TaskType } from "@/types/task-type"
import { CoinsIcon, GripVerticalIcon } from "lucide-react"

type NodeHeaderProps = {
  taskType: TaskType
}

export default function NodeHeader({ taskType }: NodeHeaderProps) {
  const task = TaskREgistery[taskType]

  console.log({ task })
  return (
    <div className="flex items-center gap-2 p-2 ">
      <task.icon size={16} />
      <div className="flex justify-between items-center w-full gap-x-2">
        <p className="text-xs font-bold uppercase  text-muted-foreground">{task.label}</p>
        <div className="flex items-center gap-x-1 text-xs">
          {task.isEntryPoint && <Badge>
            Entry point
          </Badge>}
          <Badge className="gap-x-2 text-xs">
            <CoinsIcon size={16} />
            Todo
          </Badge>
          <Button className="cursor-grab drag-handle" size={"icon"} variant={"ghost"}>
            <GripVerticalIcon size={20} />
          </Button>
        </div>

      </div>
    </div>
  )
}
