import { AppSidebar } from "@/components/app-sidebar";
import SideBarBreadCrumb from "@/components/bread-crumb";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-theme";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 justify-between px-5 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-5 " />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <SideBarBreadCrumb />
            </div>
            <ModeToggle />
          </header>
          <Separator />
          <main className="flex pt-3 pb-4 px-4  flex-1 overflow-hidden">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
