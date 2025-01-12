import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { Code2Icon, LucideProps } from "lucide-react";

export const ExtractTextFromElementTask = {
  type: TaskTypeEnum.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => <Code2Icon className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "HTML",
      type: TaskParamEnum.STRING,
      required: true,
      variant: "textarea",
    },
    {
      name: "Selector",
      type: TaskParamEnum.STRING,
      required: true,
    }
  ] as const,
  outputs: [
    {
      name: "Extracted text",
      type: TaskParamEnum.STRING,
    }
  ] as const
} satisfies WorkflowTaskType
