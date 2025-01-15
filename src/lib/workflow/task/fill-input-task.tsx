import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { EditIcon } from "lucide-react";

export const FillInputTask = {
  type: TaskTypeEnum.FILL_INPUT,
  label: "Fill Input",
  icon: (props) => <EditIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 5,
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
    {
      name: "Value",
      type: TaskParamEnum.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "Wep page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ] as const
} satisfies WorkflowTaskType
