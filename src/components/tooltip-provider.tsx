import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipWrapperProps = {
  children: React.ReactNode
  tooltipContent: string
}


export function TooltipWrapper({ children, tooltipContent }: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip >
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
