import { Label } from "@/components/ui/label"
import { ParamProps } from "@/types/app-node-types"

export default function BrowserInstanceParam({ param, value, updateNodeParamValue }: ParamProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-sm font-medium text-muted-foreground">
        {param.name}
      </Label>
    </div>
  )
}
