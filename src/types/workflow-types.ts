import { workflow } from "@/db";

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
