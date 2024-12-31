"use client";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { navItems } from "@/lib/constants";
import { Logo } from "./logo";
import { Separator } from "./ui/separator";
import { NavUser } from "./nav-user";
import UserAvaliableCreditsBadge from "./user-avaliable-credits-badge";
import { ComponentProps } from "react";

type AppSidebarProps = ComponentProps<typeof Sidebar> & {
  user: {
    email: string;
    name: string;
    avatar: string;
  };
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
        <Separator />
        <UserAvaliableCreditsBadge />
      </SidebarHeader>
      <SidebarContent>
        <NavMain routes={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
