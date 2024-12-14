"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar"
import { navItems } from "@/lib/constants"
import { Logo } from "./logo"
import { Separator } from "./ui/separator"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} >
      <SidebarHeader>
        <Logo />
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        <NavMain routes={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
