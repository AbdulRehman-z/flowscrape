export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
}

export enum TaskTypeParams {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  ARRAY = 'ARRAY',
  OBJECT = 'OBJECT',
}

export type TaskParam = {
  name: string,
  type: TaskTypeParams,
  helperText?: string,
  required?: boolean,
  hideHanlde?: boolean,
  [key: string]: any
}
