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
import { useTheme } from "@/contexts/ThemeContext";

export function SidebarComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader
        className="
            bg-sidebar-DEFAULT text-sidebar-foreground
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
          PineWork
        </h2>
      </SidebarHeader>

      <SidebarContent className="p-2 space-y-1 bg-sidebar-DEFAULT text-sidebar-foreground" >
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

            <Link to={"/users/addUser"}>
              <SidebarMenuButton>
                <UserPlus className="h-5 w-5" />
                <span>Registrar usuário</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t bg-sidebar-DEFAULT text-sidebar-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top">
                <DropdownMenuItem onClick={toggleTheme}>
                  <span>Mudar tema ({theme === "light" ? "Escuro" : "Claro"})</span>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/users/me">
                    <span>Configurações de usuário</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}