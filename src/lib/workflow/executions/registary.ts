import { ExecutionEnvironment } from "@/types/environment";
import { type TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { ExtractHtmlFromElementExecutor } from "./extract-html-from-element-executor";

type ExecutorFn<T extends WorkflowTaskType> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type RegistryType = {
  [key in TaskTypeEnum]: ExecutorFn<
    WorkflowTaskType & {
      type: key
    }
  >
}

export const ExecutorRegistory: RegistryType = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractHtmlFromElementExecutor,
}
