import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { DatabaseIcon } from "lucide-react";

export const AddPropertyToJsonTask = {
  type: TaskTypeEnum.ADD_PROPERTY_TO_JSON,
  label: "Add to JSON",
  icon: (props) => <DatabaseIcon className="stroke-green-400" {...props} />,
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
    {
      name: "Property value",
      type: TaskParamEnum.STRING,
      required: true,
    },
  ] as const,
  outputs: [
    {
      name: "Updated JSON",
      type: TaskParamEnum.STRING,
    }
  ] as const
} satisfies WorkflowTaskType
