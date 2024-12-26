import { TaskTypeEnum, TaskParamEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { GlobeIcon, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskTypeEnum.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => <GlobeIcon className="stroke-blue-400" {...props} />,
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: "Website Url",
      type: TaskParamEnum.STRING,
      helperText: "https://www.google.com",
      required: true,
      hideHandler: true,
    }
  ] as const,
  outputs: [
    {
      name: "Wep page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ] as const
} satisfies WorkflowTaskType
