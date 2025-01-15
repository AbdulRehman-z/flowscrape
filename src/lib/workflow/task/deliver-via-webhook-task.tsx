import { TaskParamEnum, TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { Send } from "lucide-react";

export const DeliverViaWebhookTask = {
  type: TaskTypeEnum.DELIVER_VIA_WEBHOOK,
  label: "Target URL",
  icon: (props) => <Send className="stroke-blue-400" {...props} />,
  isEntryPoint: false,
  credits: 1,
  inputs: [
    {
      name: "Target URL",
      type: TaskParamEnum.STRING,
      required: true,
    },
    {
      name: "Body",
      type: TaskParamEnum.STRING,
      required: true,
    },
  ] as const,
  outputs: [
  ] as const
} satisfies WorkflowTaskType
