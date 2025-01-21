import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { TaskTypeEnum } from "@/types/task-type"
import { CoinsIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent } from "../ui/sidebar"

type TaskMenuProps = {
  taskType: TaskTypeEnum
}

function TaskMenuButton({ taskType }: TaskMenuProps) {
  const task = TaskREgistery[taskType]

  const onDragStart = (event: React.DragEvent, type: TaskTypeEnum) => {
    event.dataTransfer.setData("application/reactflow", type)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <Button variant={"secondary"} className="flex w-full items-center justify-between gap-2 p-4 hover:bg-foreground/10" draggable onDragStart={(event) => onDragStart(event, taskType)}>
      <div className="flex gap-2">
        <task.icon size={20} />
        <span>{task.label}</span>
      </div>
      <Badge className="flex items-center justify-center gap-x-[4px]" variant={"outline"}>
        <CoinsIcon className="stroke-green-400" />
        <span>{task.credits}</span>
      </Badge>
    </Button>
  )
}

export default function WorkflowEditorTaskMenu() {
  return (
    <Sidebar collapsible="none" className="hidden border-r py-2 px-4 md:flex w-max">
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Accordion className="w-full" type="multiple" defaultValue={["data-extraction", "user-interactions", "timing", "webhook", "ai-data-extraction", "read-json",]}>
              <AccordionItem value="user-interactions">
                <AccordionTrigger className="no-underline font-semibold">
                  User interactions
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.FILL_INPUT} />
                  <TaskMenuButton taskType={TaskTypeEnum.CLICK_ELEMENT} />
                  <TaskMenuButton taskType={TaskTypeEnum.NAVIGATE_TO_url} />
                  <TaskMenuButton taskType={TaskTypeEnum.SCROLL_TO_ELEMENT} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-extraction">
                <AccordionTrigger className="no-underline font-semibold">
                  Data extraction
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.PAGE_TO_HTML} />
                  <TaskMenuButton taskType={TaskTypeEnum.EXTRACT_TEXT_FROM_ELEMENT} />
                  <TaskMenuButton taskType={TaskTypeEnum.EXTRACT_DATA_WITH_AI} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="timing">
                <AccordionTrigger className="no-underline font-semibold">
                  Timing controls
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.WAIT_FOR} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="webhook">
                <AccordionTrigger className="no-underline font-semibold">
                  Results delivery
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.DELIVER_VIA_WEBHOOK} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="read-json">
                <AccordionTrigger className="no-underline font-semibold">
                  Data storage
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.READ_PROPERTY_FROM_JSON} />
                  <TaskMenuButton taskType={TaskTypeEnum.ADD_PROPERTY_TO_JSON} />
                </AccordionContent>
              </AccordionItem>

            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar >
  )
}
