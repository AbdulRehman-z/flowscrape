"use client"
import { useUpdateExecutionCron } from "@/hooks/workflow/use-update-execution-cron"
import { cn } from "@/lib/utils"
import parser from "cron-parser"
import cronstrue from "cronstrue"
import { Calendar, CalendarDaysIcon, CalendarIcon, Clock4Icon, ClockIcon, TrashIcon, TriangleAlertIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import CustomDialogHeader from "../custom-dialog-header"
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import { useRemoveExecutionCron } from "@/hooks/workflow/use-remove-execution-cron"

type SchedulerDialogProps = {
  workflowId: string
  savedCron: string | null
}

const CRON_EXAMPLES = [
  {
    expression: "*/15 * * * *",
    description: "Every 15 minutes",
    icon: Clock4Icon,
  },
  {
    expression: "0 */2 * * *",
    description: "Every 2 hours",
    icon: ClockIcon,
  },
  {
    expression: "0 0 * * *",
    description: "Daily at midnight",
    icon: Calendar,
  },
  {
    expression: "0 0 * * MON",
    description: "Every Monday at midnight",
    icon: CalendarDaysIcon,
  },
] as const

export default function SchedulerDialog({ workflowId, savedCron }: SchedulerDialogProps) {
  const [cron, setCron] = useState("")
  const [validCron, setValidCron] = useState(false)
  const [readableCron, setReadableCron] = useState(savedCron || null)
  const { updateExecutionCron, isUpdatingExecutionCron } = useUpdateExecutionCron()
  const { isRemovingExecutionCron, removeExecutionCron } = useRemoveExecutionCron()

  function handleSave() {
    toast.loading("Saving workflow execution schedule...", {
      id: "execution-schedule"
    })
    updateExecutionCron({
      cron,
      workflowId,
    })
  }

  useEffect(() => {
    try {
      parser.parseExpression(cron, { utc: true })
      const humanCronStr = cronstrue.toString(cron)
      setValidCron(true)
      setReadableCron(humanCronStr)
    } catch {
      setValidCron(false)
      setReadableCron("Invalid cron expression")
    }
  }, [cron, setValidCron, setReadableCron])


  const workflowHasValidCron = savedCron && savedCron.length > 0
  const readableSavedCron = savedCron && cronstrue.toString(savedCron)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          <div className="flex items-center gap-2">
            {
              workflowHasValidCron
                ? <>
                  <TriangleAlertIcon className="size-4 text-muted-foreground" />
                  <span className="text-base font-medium">Set schedule</span>
                </>
                : <>
                  <ClockIcon className="size-4 text-muted-foreground" />
                  <span className="text-base font-medium">{readableSavedCron}</span>
                </>
            }
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

          {cron &&
            <DialogClose asChild>
              <Button variant="outline" onClick={() => removeExecutionCron(workflowId)} className="w-full sm:w-auto absolute right-2 top-2 rounded-full bg-destructive text-foreground p-1 hover:bg-destructive/80">Remove current cron</Button>
              <TrashIcon className="size-4 text-muted-foreground" />
            </DialogClose>
          }

          <div className={cn(
            "p-3 rounded-lg text-sm transition-colors",
            validCron
              ? "bg-primary/10 text-primary border border-primary/20"
              : "bg-destructive/10 text-destructive border border-destructive/20"
          )}>
            {validCron ? readableCron : "Invalid cron expression"}
          </div>



          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Common Examples:</p>
            <div className="grid grid-cols-1 gap-2">
              {CRON_EXAMPLES.map((example) => (
                <button
                  key={example.expression}
                  onClick={() => setCron(example.expression)}
                  className={cn(
                    "flex items-center gap-x-2 p-2 rounded-lg text-sm transition-colors hover:bg-accent",
                    cron === example.expression && "bg-accent"
                  )}
                >
                  <example.icon className="size-4 text-muted-foreground" />
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-xs">{example.expression}</span>
                    <span className="text-muted-foreground">{example.description}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-3 text-xs text-muted-foreground space-y-1">
            <p className="font-medium text-foreground">Format Reference:</p>
            <p>minute hour day-of-month month day-of-week</p>
            <p className="text-[10px]">Values: 0-59 0-23 1-31 1-12 0-7 (0 or 7 is Sunday)</p>
            <p className="text-[10px]">Special characters: * (any) / (step) - (range) , (list)</p>
          </div>
        </div>
        <DialogFooter className="px-6 pb-6 gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={handleSave}
              disabled={!validCron || isUpdatingExecutionCron}
              className="w-full sm:w-auto"
            >
              Save schedule
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
