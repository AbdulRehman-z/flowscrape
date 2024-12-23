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

export enum WorkflowExecutionStatusEnum {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum WorkflowExecutionPhaseStatusEnum {
  PENDING = "PENDING",
  CREATED = "CREATED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum WorkflowTriggerEnum {
  MANUAL = "MANUAL",
  SCHEDULED = "SCHEDULED",
}

export type WorkflowExecutionPhaseType = {
  id: string;
  userId: string;
  status: string;
  number: number;
  node: string;
  name: string;
  startedAt: Date;
  createdAt: Date;
  inputs: string;
  outputs: string;
  creditsCost: number;
  workflowExecutionId: string;
};

export type WorkflowExecutionType = {
  id: string;
  userId: string;
  trigger: string;
  status: string;
  createdAt: Date;
  startedAt: Date;
  completedAt: Date | null;
  workflowId: string;
  phases: WorkflowExecutionPhaseType[];
};
