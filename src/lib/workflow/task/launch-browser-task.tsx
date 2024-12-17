import { TaskType, TaskTypeParams } from "@/types/task-type";
import { LucideProps, GlobeIcon } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  icon: (props: LucideProps) => <GlobeIcon className="stroke-blue-400" {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: TaskTypeParams.STRING,
      helperValue: "https://www.google.com",
      required: true,
      hideHandler: true,
    }
  ]
}
