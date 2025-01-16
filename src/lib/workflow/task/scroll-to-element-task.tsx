import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { ArrowUp } from "lucide-react";

export const ScrollToElementTask = {
  type: TaskTypeEnum.SCROLL_TO_ELEMENT,
  label: "Scrol to element",
  icon: (props) => <ArrowUp className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
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
      name: "Web page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ] as const
} satisfies WorkflowTaskType
