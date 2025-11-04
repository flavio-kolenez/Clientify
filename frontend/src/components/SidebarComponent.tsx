import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Settings, UserPlus, Users, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

export function SidebarComponent() {
  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader
        className="
            bg-neutral-100
            px-4 py-2 border-b
            flex flex-row items-center justify-start
            transition-all
            group-data-[collapsible=icon]:justify-center
            group-data-[collapsible=icon]:px-0
            gap-2
            group-data-[collapsible=icon]:gap-0
          "
      >
        <UsersRound className="h-5 w-5 shrink-0" />
        <h2 className="
            text-sm font-semibold transition-all
            group-data-[collapsible=icon]:opacity-0
            group-data-[collapsible=icon]:w-0
            group-data-[collapsible=icon]:overflow-hidden
          "
        >
          Clientify
        </h2>
      </SidebarHeader>

      <SidebarContent className="p-2 space-y-1  bg-neutral-100" >
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/clients/list">
              <SidebarMenuButton>
                <Users className="h-5 w-5" />
                <span>Listar Clientes</span>
              </SidebarMenuButton>
            </Link>

            <Link to={"/clients/addClient"}>
              <SidebarMenuButton>
                <UserPlus className="h-5 w-5" />
                <span>Cadastrar Cliente</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t bg-neutral-100">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top"className="w-[--radix-popper-anchor-width] bg-neutral-100">
                <DropdownMenuItem>
                  <span>Mudar tema</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}