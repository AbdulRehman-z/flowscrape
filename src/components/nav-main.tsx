"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"

type NavMainProps = {
  routes: {
    title: string
    url: string
    icon?: LucideIcon
    subRoutes?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}

export function NavMain({ routes }: NavMainProps) {
  const pathName = usePathname()
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({})

  useEffect(() => {
    // Initialize open states based on pathname
    const initialStates = routes.reduce((acc, route) => {
      acc[route.title] = route.subRoutes?.some(sub => pathName.startsWith(sub.url)) || false
      return acc
    }, {} as Record<string, boolean>)
    setOpenStates(initialStates)
  }, [pathName, routes])

  const activeRoute = routes.find((route) => {
    const hasActiveSubRoute = route.subRoutes?.some(sub => pathName.startsWith(sub.url))
    return (route.url.length > 0 && pathName.startsWith(route.url)) || hasActiveSubRoute
  }) || routes[0]

  return (
    <SidebarGroup className="mt-6">
      <SidebarMenu className="space-y-1">
        {routes.map((route) => (
          <Collapsible
            key={route.title}
            open={openStates[route.title]}
            onOpenChange={(open) => setOpenStates(prev => ({ ...prev, [route.title]: open }))}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  isActive={activeRoute.url === route.url || route.subRoutes?.some(sub => pathName.startsWith(sub.url))}
                  tooltip={route.title}
                >
                  <div className="flex items-center w-full">
                    <Link href={route.url} className="flex items-center gap-2 flex-1">
                      {route.icon && <route.icon className="size-5" />}
                      <span className="text-sm font-medium">{route.title}</span>
                    </Link>
                    {Array.isArray(route.subRoutes) && route.subRoutes.length > 0 && (
                      <ChevronRight className="ml-auto size-4 transition-transform duration-200  group-data-[state=open]/collapsible:rotate-90" />
                    )}
                  </div>
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub className="mt-2">
                  {route.subRoutes?.map((subRoute) => (
                    <SidebarMenuSubItem key={subRoute.title}>
                      <SidebarMenuButton
                        isActive={pathName.startsWith(subRoute.url)}
                        tooltip={subRoute.title}
                      >
                        <Link href={subRoute.url} className="flex items-center gap-2 w-full">
                          {subRoute.icon && <subRoute.icon className="size-4" />}
                          <span className="text-sm font-medium">{subRoute.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
