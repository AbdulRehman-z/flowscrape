"use client"

import SideBarBreadCrumb from "@/components/bread-crumb"
import { ModeToggle } from "@/components/toggle-theme"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { WorkflowsNavigations } from "./workflows-navigations"

export function DashboardLayoutContent({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const pathname = usePathname()
  // Check if current page is an executions page by looking for '/workflows/executions/' in the path
  const isExecutorPage = pathname.includes('/workflows/executions/')
  const isEditorPage = pathname.includes('/workflows/editor/')

  const showWorkflowsNavigations = isExecutorPage || isEditorPage

  // Split the path after '/workflows/executions/' into segments, return empty array if not found
  const executorSegments = pathname.split('/workflows/executions/')[1]?.split('/') || []
  console.log({ executorSegments })

  // Check if we're on a detailed executions page (has more than one segment after executions)
  const isDetailedExecutorPage = executorSegments.length > 1

  // State for controlling sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Handler function to toggle sidebar open/closed state
  function handleOpenChange() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Effect to control sidebar state based on current page
  useEffect(() => {
    // If not on executions page, keep sidebar open
    if (!isExecutorPage) {
      setIsSidebarOpen(true)
      return
    }

    // On detailed executions pages close sidebar, otherwise keep it open
    if (isDetailedExecutorPage) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
    }
  }, [isExecutorPage, isDetailedExecutorPage])


  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={handleOpenChange}>
      {sidebar}
      <SidebarInset>
        <header className="flex h-16 shrink-0 justify-between px-5 items-center gap-2 transition-[width,height] border-b-2 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-5 " />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <SideBarBreadCrumb />
          </div>
          {showWorkflowsNavigations && <WorkflowsNavigations isEditorPage={isEditorPage} />}
          <ModeToggle />
        </header>
        <Separator />
        <main className="flex flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
