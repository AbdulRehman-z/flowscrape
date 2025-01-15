import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { Clock2 } from "lucide-react";

export const WaitforElementTask = {
  type: TaskTypeEnum.WAIT_FOR,
  label: "Wait for element",
  icon: (props) => <Clock2 className="stroke-amber-400" {...props} />,
  isEntryPoint: false,
  credits: 3,
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
      name: "Visibility",
      type: TaskParamEnum.SELECT,
      options: [
        {
          label: "Visible",
          value: "visible"
        },
        {
          label: "Hidden",
          value: "hidden"
        },
      ],
      required: true
    }
  ] as const,
  outputs: [
    {
      name: "Wep page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ] as const
} satisfies WorkflowTaskType
