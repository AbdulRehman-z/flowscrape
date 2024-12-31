import { WorkflowExecutionPhaseStatusEnum, WorkflowExecutionStatusEnum } from "@/types/workflow-types"
import { BookOpenCheckIcon, CheckCheck, CircleDotIcon, CircleXIcon, FastForwardIcon } from "lucide-react"

type PhaseStatusBadgeProps = {
  phaseStatus: string
}

export default function PhaseStatusBadge({ phaseStatus }: PhaseStatusBadgeProps) {
  switch (phaseStatus) {
    case WorkflowExecutionPhaseStatusEnum.CREATED:
      return <BookOpenCheckIcon size={50} className="stroke-primary" />
    case WorkflowExecutionPhaseStatusEnum.FAILED:
      return <CircleXIcon size={50} className="stroke-destructive motion-preset-shake " />
    case WorkflowExecutionPhaseStatusEnum.COMPLETED:
      return <CheckCheck size={50} className="stroke-green-500 motion-preset-confetti" />
    case WorkflowExecutionPhaseStatusEnum.PENDING:
      return <CircleDotIcon size={50} className="stroke-gray-500 motion-preset-pulse  " />
    case WorkflowExecutionStatusEnum.RUNNING:
      return <FastForwardIcon size={50} className="stroke-yellow-500 motion-preset-oscillate " />
    default:
      return <span className="badge bg-secondary">Unknown</span>
  }

}
