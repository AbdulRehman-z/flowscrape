"use client"

import { type LucideIcon } from "lucide-react"

import { useState } from "react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type NavMainProps = {
  routes: {
    title: string
    url: string
    icon?: LucideIcon
  }[]
}

export function NavMain({ routes }: NavMainProps) {
  // const pathName = usePathname()
  const [activeItem, setActiveItem] = useState(routes[0])

  // const activeRoute = routes.find((route) => route.url.length > 0 && pathName.startsWith(route.url)) || routes[0]


  return (
    <SidebarGroup className="mt-6">
      <SidebarMenu className="gap-y-2">
        {routes.map((route) => (
          <SidebarMenuItem key={route.title} className="" >
            <SidebarMenuButton
              isActive={activeItem.url === route.url}
              tooltip={route.title}
              asChild
            >
              <Link
                onClick={() => setActiveItem(route)}
                className="p-5 tracking-wider"
                href={route.url}
              >
                {route.icon && <route.icon className="size-6" />}
                <span className="text-sm font-medium">{route.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup >
  )
}
