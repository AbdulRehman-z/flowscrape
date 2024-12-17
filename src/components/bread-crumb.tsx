"use client"

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

export default function SideBarBreadCrumb() {
  const pathname = usePathname()
  const paths = pathname === "/" ? [""] : pathname.split("/").filter(Boolean)

  // const formatSegment = (segment: string) => {
  //   return segment.replace(/-/g, ' ')
  // }

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center">
        {paths.map((path, index) => (
          <div key={index} className="flex items-center">
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/${paths.slice(0, index + 1).join("/")}`}
                className={cn(
                  "capitalize text-sm transition-colors",
                  index === paths.length - 1
                    ? "text-foreground font-medium pointer-events-none"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {path}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="mx-2 text-muted-foreground" />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
