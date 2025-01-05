import { WorkflowExecutionStatusEnum } from "@/types/workflow-types";

export default function ExecutionStatusBadge({ status }: { status: string }) {
  switch (status) {
    case WorkflowExecutionStatusEnum.RUNNING:
      return <div className="flex items-center gap-x-2"> <span className="bg-yellow-500 size-1 rounded-full"></span><span>RUNNING</span> </div>
    case WorkflowExecutionStatusEnum.COMPLETED:
      return <div className="flex items-center gap-x-2"> <span className="bg-green-500 size-1 rounded-full"></span><span>COMPLETED</span> </div>
    case WorkflowExecutionStatusEnum.FAILED:
      return <div className="flex items-center gap-x-2"> <span className="bg-red-500 size-1 rounded-full"></span><span>FAILED</span> </div>
  }
}
