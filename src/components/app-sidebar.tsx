import * as React from "react"
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/context/AuthContext"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  const data = {
    user: {
      name: user?.name || "Usuário",
      email: user?.email || "usuario@solarium.com",
      avatar: user?.avatar || "/assets/avatar_renan.png",
    },
    navMain: [
      {
        title: "Visão Geral",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Transações",
        url: "/dashboard/transactions",
        icon: CreditCard,
      },
      {
        title: "Relatórios",
        url: "/dashboard/reports",
        icon: FileText,
      },
      {
        title: "Cadastros",
        url: "/dashboard/registrations",
        icon: Users,
      },
    ],
  }

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-white/5 bg-[#1A1A1A]">
      <SidebarHeader className="h-16 border-b border-white/5 justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent active:bg-transparent">
              <img src="/assets/solarium-logo.png" alt="Solarium" className="size-8 rounded-lg" />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-white text-base">Solarium</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
