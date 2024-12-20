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
  const isWorkflowEditor = pathname.startsWith("/workflows/editor")
  const [isSidebarOpen, setIsSidebarOpen] = useState(isWorkflowEditor)

  function handleOpenChange() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    if (isWorkflowEditor) return setIsSidebarOpen(false)
    return setIsSidebarOpen(true)

  }, [setIsSidebarOpen, isWorkflowEditor])


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
