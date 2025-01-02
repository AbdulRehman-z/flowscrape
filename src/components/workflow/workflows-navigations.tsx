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
  // Set the active tab based on whether we're in editor or executions view
  const defaultTab = isEditorPage ? "editor" : "executions"
  const pathname = usePathname()

  /**
   * Extracts workflow ID from URL path
   * Handles two URL patterns:
   * 1. /workflows/executions/[workflowId]/[executionId]
   * 2. /workflows/editor/[workflowId]
   */
  const getWorkflowId = (path: string) => {
    const parts = path.split('/')
    // For execution URLs, workflow ID is the segment after "executions"
    if (path.includes('/executions/')) {
      return parts[parts.indexOf('executions') + 1]
    }
    // For editor URLs, workflow ID is the last segment
    return parts.at(-1)
  }

  // Extract workflow ID from current URL path
  const workflowId = getWorkflowId(pathname)

  return (
    <Tabs defaultValue={defaultTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        {/* Editor tab with link to workflow editor */}
        <TabsTrigger
          value="editor"
          className="data-[state=active]:bg-background"
          asChild
        >
          <Link href={`/workflows/editor/${workflowId}`}>
            Editor
          </Link>
        </TabsTrigger>
        {/* Executions tab with link to workflow executions list */}
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
