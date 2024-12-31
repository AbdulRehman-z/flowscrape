"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function WorkflowsNavigations({
  isEditorPage,
}: {
  isEditorPage: boolean
}) {
  const defaultTab = isEditorPage ? "editor" : "executions"
  const pathname = usePathname()
  const workflowId = pathname.split("/").at(-1)

  console.log({ workflowId })

  return (
    <Tabs defaultValue={defaultTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="editor"
          className="data-[state=active]:bg-background"
          asChild
        >
          <Link href={`/workflows/editor/${workflowId}`}>
            Editor
          </Link>
        </TabsTrigger>
        <TabsTrigger
          value="executions"
          className="data-[state=active]:bg-background"
          asChild
        >
          <Link href={`/workflows/executions/${workflowId}`}>
            Executions
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
