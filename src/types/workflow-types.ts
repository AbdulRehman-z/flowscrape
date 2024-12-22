import { LucideProps } from "lucide-react";
import { TaskParamEnum, TaskParamType, TaskTypeEnum } from "./task-type";
import { AppNodeType } from "./app-node-types";

export enum WorkflowStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
}

export type WorkflowType = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  defination: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};



export type WorkflowTaskType = {
  type: TaskTypeEnum
  label: string;
  icon: React.FC<LucideProps>;
  isEntryPoint: boolean
  inputs: Array<TaskParamType>;
  outputs: Array<TaskParamType>;
  credits: number;
}


export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNodeType[]
}

export type WorkflowExecutionPlanType = WorkflowExecutionPlanPhase[]


export type AppNodeMissingInputsType = {
  nodeId: string;
  inputs: string[];
}
