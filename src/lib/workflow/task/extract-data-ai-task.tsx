import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { BrainIcon } from "lucide-react";

export const ExtractDataWithAiTask = {
  type: TaskTypeEnum.EXTRACT_DATA_WITH_AI,
  label: "Extract data with ai",
  icon: (props) => <BrainIcon className="stroke-purple-400" {...props} />,
  isEntryPoint: false,
  credits: 4,
  inputs: [
    {
      name: "Content",
      type: TaskParamEnum.STRING,
      required: true,
    },
    {
      name: "Credentials",
      type: TaskParamEnum.CREDENTIALS,
      required: true,
    },
    {
      name: "Prompt",
      type: TaskParamEnum.STRING,
      required: true,
      variant: "textarea"
    }
  ] as const,
  outputs: [
    {
      name: "Extracted data",
      type: TaskParamEnum.STRING
    }
  ] as const
} satisfies WorkflowTaskType
