export enum TaskTypeEnum {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
  PAGE_TO_HTML = 'PAGE_TO_HTML',
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT"
}

export enum TaskParamEnum {
  STRING = 'STRING',
  BROWSER_INSTANCE = 'BROWSER_INSTANCE',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
}

export type TaskParamType = {
  name: string,
  type: TaskParamEnum,
  helperText?: string,
  required?: boolean,
  hideHandler?: boolean,
  [key: string]: unknown,
}
