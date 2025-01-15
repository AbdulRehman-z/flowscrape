import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ParamProps } from "@/types/app-node-types"
import { useId } from "react"

type OpionType = {
  label: string
  value: string
}

export default function SelectParam({ param, inputValue, updateNodeParamValue }: ParamProps) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-sm flex">
        {param.name}
        {param.required && <p className="px-1 text-red-400">*</p>}
      </Label>
      <Select onValueChange={(value) => updateNodeParamValue(value)} defaultValue={inputValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup>
            {param.options.map((option: OpionType) => {
              return (
                <SelectItem key={option.value} value={option.value} >
                  {option.label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
