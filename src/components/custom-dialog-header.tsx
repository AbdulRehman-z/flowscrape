import { LucideIcon } from "lucide-react"
import { DialogHeader, DialogTitle } from "./ui/dialog"
import { cn } from "@/lib/utils"

type CustomDialogHeaderProps = {
  icon: LucideIcon
  title?: string
  subtitle?: string
  iconClassName?: string
  titleClassName?: string
  subtitleClassName?: string
}

export default function CustomDialogHeader(props: CustomDialogHeaderProps) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex items-center flex-col gap-2 mb-2">
          {props.icon &&
            <props.icon size={30} className={cn("", props.iconClassName)} />
          }
          {
            props.title &&
            <p className={cn("text-lg font-semibold text-foreground", props.titleClassName)}>{props.title}</p>
          }
          {
            props.subtitle &&
            <p className={cn("text-sm text-muted-foreground", props.subtitleClassName)}>{props.subtitle}</p>
          }
        </div>
      </DialogTitle>
    </DialogHeader>
  )
}
