"use client"

import { TooltipWrapper } from "@/components/tooltip-provider"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import ExecuteButton from "./topbar-executebtn"
import SaveButton from "./topbar-savebtn"

type TopbarProps = {
  workflowId: string
  title: string
  subtitle?: string
}

export default function Topbar({ workflowId, title, subtitle }: TopbarProps) {
  const router = useRouter()

  function handleBack() {
    router.back()
  }

  return (
    <header className="flex sticky top-0 py-2 h-fit w-full items-center px-7  justify-between border-b">
      <div className="py-2 px-1 flex justify-between items-center w-full">
        <div className="flex gap-x-3">
          <TooltipWrapper tooltipContent="Back">
            <Button variant={"ghost"} size="icon" onClick={handleBack}>
              <ChevronLeftIcon className="cursor-pointer" size={24} />
            </Button>
          </TooltipWrapper>
          <div className="flex flex-col gap-y-1">
            <h1 className="text-2xl font-bold truncate text-ellipsis">{title}</h1>
            {
              subtitle &&
              <p className="text-sm text-ellipsis truncate text-muted-foreground">{subtitle}</p>
            }
          </div>
        </div>
        <div className="flex gap-x-3 items-center">
          <ExecuteButton workflowId={workflowId} />
          <SaveButton workflowId={workflowId} />
        </div>
      </div>
    </header >
  )
}
