"use client"

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

export default function SideBarBreadCrumb() {
  const pathname = usePathname()
  const paths = pathname === "/" ? [""] : pathname.split("/")

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {paths.map((path, index) => (
            <BreadcrumbLink
              key={index}
              href={path === "" ? "/" : `/${path}`}
              className={cn(path === paths[paths.length - 1] ? "text-gray-400" : "text-gray-500", "capitalize")}
            >
              {path}
            </BreadcrumbLink>
          ))}
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {/* <BreadcrumbItem>
          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
        </BreadcrumbItem> */}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
