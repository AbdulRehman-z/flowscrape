import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { Code2Icon, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskTypeEnum.PAGE_TO_HTML,
  label: "Get html from page",
  icon: (props: LucideProps) => <Code2Icon className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "Web page",
      type: TaskParamEnum.BROWSER_INSTANCE,
      required: true,
    }
  ],
  outputs: [
    {
      name: "HTML",
      type: TaskParamEnum.STRING,
    },
    {
      name: "Web page",
      type: TaskParamEnum.BROWSER_INSTANCE,
    }
  ]
} satisfies WorkflowTaskType
