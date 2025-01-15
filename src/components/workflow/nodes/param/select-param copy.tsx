import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCredentials } from "@/hooks/credential/use-get-credentials"
import { ParamProps } from "@/types/app-node-types"
import { useId } from "react"

export default function CredentialsParam({ param, inputValue, updateNodeParamValue }: ParamProps) {
  const id = useId()
  const credentials = useGetCredentials()
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
            {
              credentials?.map((credential) => {
                return <SelectItem key={credential.id} value={credential.value!} >
                  {credential.name}
                </SelectItem>
              })
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
