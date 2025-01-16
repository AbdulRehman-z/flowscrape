import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { LinkIcon } from "lucide-react";

export const NavigateToUrlTask = {
  type: TaskTypeEnum.NAVIGATE_TO_url,
  label: "Navigate to url",
  icon: (props) => <LinkIcon className="stroke-orange-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Web page",
      type: TaskParamEnum.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "URL",
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
