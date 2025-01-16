import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { FileJson2Icon } from "lucide-react";

export const ReadPropertyFromJsonTask = {
  type: TaskTypeEnum.READ_PROPERTY_FROM_JSON,
  label: "Read from Json",
  icon: (props) => <FileJson2Icon className="stroke-green-400" {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: "JSON",
      type: TaskParamEnum.STRING,
      required: true,
    },
    {
      name: "Property name",
      type: TaskParamEnum.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Property value",
      type: TaskParamEnum.STRING,
    }
  ] as const
} satisfies WorkflowTaskType
