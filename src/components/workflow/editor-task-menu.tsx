import { SidebarHeader, SidebarInput, SidebarContent, SidebarGroup, SidebarGroupContent, Sidebar } from "../ui/sidebar"
import { Button } from "../ui/button"
import { TaskTypeEnum } from "@/types/task-type"
import { TaskREgistery } from "@/lib/workflow/task/task-registery"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

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
    <Button variant={"secondary"} className="flex w-full items-center justify-start " draggable onDragStart={(event) => onDragStart(event, taskType)}>
      <div className="flex gap-2">
        <task.icon size={20} />
        <span>{task.label}</span>
      </div>
    </Button>
  )
}

export default function WorkflowEditorTaskMenu() {
  return (
    <Sidebar collapsible="none" className="hidden border-r py-2 px-4 min-h-screen md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">
            <p>Tasks</p>
          </div>
        </div>
        <SidebarInput placeholder="Type to search..." />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <Accordion className="w-full" type="multiple" defaultValue={["data-extraction", "user-interactions"]}>

              <AccordionItem value="user-interactions">
                <AccordionTrigger className="no-underline">
                  User interactions
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.FILL_INPUT} />
                  <TaskMenuButton taskType={TaskTypeEnum.CLICK_ELEMENT} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-extraction">
                <AccordionTrigger className="no-underline">
                  Data extraction
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.PAGE_TO_HTML} />
                  <TaskMenuButton taskType={TaskTypeEnum.EXTRACT_TEXT_FROM_ELEMENT} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-extraction">
                <AccordionTrigger className="no-underline">
                  Timing controls
                </AccordionTrigger>
                <AccordionContent className=" flex flex-col gap-y-2">
                  <TaskMenuButton taskType={TaskTypeEnum.WAIT_FOR} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
