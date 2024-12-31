"use client"

import SideBarBreadCrumb from "@/components/bread-crumb"
import { ModeToggle } from "@/components/toggle-theme"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function DashboardLayoutContent({
  children,
  sidebar
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
}) {
  const pathname = usePathname()
  // Check if current page is an executor page by looking for '/workflows/executor/' in the path
  const isExecutorPage = pathname.includes('/workflows/executor/')

  // Split the path after '/workflows/executor/' into segments, return empty array if not found
  const executorSegments = pathname.split('/workflows/executor/')[1]?.split('/') || []


  // Check if we're on a detailed executor page (has more than one segment after executor)
  const isDetailedExecutorPage = executorSegments.length > 1

  // State for controlling sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Handler function to toggle sidebar open/closed state
  function handleOpenChange() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Effect to control sidebar state based on current page
  useEffect(() => {
    // If not on executor page, keep sidebar open
    if (!isExecutorPage) {
      setIsSidebarOpen(true)
      return
    }

    // On detailed executor pages close sidebar, otherwise keep it open
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
          <ModeToggle />
        </header>
        <Separator />
        <main className="flex flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
