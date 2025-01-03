"use client"

import { Dialog } from "@radix-ui/react-dialog"
import { DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"
import cronstrue from "cronstrue"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon, TriangleAlertIcon } from "lucide-react"
import CustomDialogHeader from "../custom-dialog-header"
import { Input } from "../ui/input"
import { useUpdateExecutionCron } from "@/hooks/workflow/use-update-execution-cron"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Separator } from "../ui/separator"

type SchedulerDialogProps = {
  workflowId: string
}

export default function SchedulerDialog({ workflowId }: SchedulerDialogProps) {
  const [cron, setCron] = useState("")
  const [validCron, setValidCron] = useState(false)
  const [readableCron, setReadableCron] = useState("")
  const { updateExecutionCron, isUpdatingExecutionCron } = useUpdateExecutionCron()


  function handleSave() {
    toast.loading("Saving workflow execution schedule...", {
      id
        : "execution-schedule"
    })
    updateExecutionCron({
      cron,
      workflowId,
    })
  }


  useEffect(() => {
    try {
      const humanCronStr = cronstrue.toString(cron)
      setValidCron(true)
      setReadableCron(humanCronStr)
    } catch (error) {
      setValidCron(false)
      console.error(error)
    }
  }, [setValidCron, cron])




  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
        >
          <div className="flex items-center gap-2">
            <TriangleAlertIcon className="size-4 text-muted-foreground" />
            <span className="text-base font-medium">Set schedule</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <CustomDialogHeader
          title="Schedule workflow execution"
          icon={CalendarIcon}
          subtitle="Set up automated periodic execution using cron expressions"
        />

        <Separator />

        <div className="space-y-4 px-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cron Expression</label>
            <Input
              value={cron}
              onChange={(e) => setCron(e.target.value)}
              placeholder="* * * * *"
              className="font-mono"
            />
          </div>

          <div className={cn(
            "p-3 rounded-lg text-sm transition-colors",
            validCron
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          )}>
            {validCron ? readableCron : "Invalid cron expression"}
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            Save schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
