import { TaskTypeEnum } from "@/types/task-type";
import { WorkflowTaskType } from "@/types/workflow-types";
import { ClickElementTask } from "./click-element-task";
import { ExtractTextFromElementTask } from "./extractTextFromHtml-task";
import { FillInputTask } from "./fill-input-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { PageToHtmlTask } from "./pageToHtml-task";
import { WaitforElementTask } from "./wait-for-element";
import { DeliverViaWebhookTask } from "./deliver-via-webhook-task";
import { ExtractDataWithAiTask } from "./extract-data-ai-task";

export type Registery = {
  [key in TaskTypeEnum]: WorkflowTaskType & { type: key }
}

export const TaskREgistery: Registery = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElementTask,
  WAIT_FOR: WaitforElementTask,
  DELIVER_VIA_WEBHOOK: DeliverViaWebhookTask,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAiTask
}
