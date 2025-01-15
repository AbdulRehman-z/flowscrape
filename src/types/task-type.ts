export enum TaskTypeEnum {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  FILL_INPUT = 'FILL_INPUT',
  CLICK_ELEMENT = "CLICK_ELEMENT",
  WAIT_FOR = "WAIT_FOR",
  DELIVER_VIA_WEBHOOK = "DELIVER_VIA_WEBHOOK",
  EXTRACT_DATA_WITH_AI = "EXTRACT_DATA_WITH_AI"
}

export enum TaskParamEnum {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
  SELECT = "SELECT",
  CREDENTIALS = "CREDENTIALS"

}

export type TaskParamType = {
  name: string,
  type: TaskParamEnum,
  helperText?: string,
  required?: boolean,
  hideHandler?: boolean,
  [key: string]: unknown,
}
