import { ExecutionEnvironment } from "@/types/environment";
import { type TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { ClickElementExecutor } from "./click-element-executor";
import { DeliverViaWebhookExecutor } from "./deliver-via-webhook-executor";
import { ExtractHtmlFromElementExecutor } from "./extract-html-from-element-executor";
import { FillInputExecutor } from "./fill-input-executor";
import { LaunchBrowserExecutor } from "./launch-browser-executor";
import { PageToHtmlExecutor } from "./page-to-html-executor";
import { WaitForElementExecutor } from "./wait-for-element-executor";
import { ExtractDataWithAiExecutor } from "./extract-data-with-ai-executor";

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
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
  WAIT_FOR: WaitForElementExecutor,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookExecutor,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiExecutor
}
