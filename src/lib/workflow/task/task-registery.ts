import { WorkflowTaskType } from "@/types/workflow-types";
import { ExtractTextFromElement } from "./extractTextFromHtml-task";
import { LaunchBrowserTask } from "./launch-browser-task";
import { PageToHtmlTask } from "./pageToHtml-task";
import { TaskParamType, TaskTypeEnum } from "@/types/task-type";


export type Registery = {
  [key in TaskTypeEnum]: WorkflowTaskType & { type: key }
}


export const TaskREgistery: Registery = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElement
}
