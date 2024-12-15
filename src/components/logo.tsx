"use client"

import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar"

export function Logo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex mx-auto py-2">
        <div className="flex items-center gap-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <div className="size-5 bg-white rounded-md"></div>
          </div>
          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-semibold ">
              Acme Inc
            </span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
