import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { MousePointer } from "lucide-react";

export const ClickElementTask = {
  type: TaskTypeEnum.CLICK_ELEMENT,
  label: "Click Element",
  icon: (props) => <MousePointer className="stroke-orange-400" {...props} />,
  isEntryPoint: true,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamEnum.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: TaskParamEnum.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Wep page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ] as const
} satisfies WorkflowTaskType
