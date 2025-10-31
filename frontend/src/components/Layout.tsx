import {
    SidebarProvider,
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

type LayoutProps = {
    children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <SidebarProvider>
                <Sidebar side="left" collapsible="icon" className="border-r group transition-all">
                    <SidebarHeader
                        className="
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

                    {/* MENU */}
                    <SidebarContent className="p-2 space-y-1">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Users className="h-5 w-5" />
                                    <span>Listar Clientes</span>
                                </SidebarMenuButton>

                                <SidebarMenuButton>
                                    <UserPlus className="h-5 w-5" />
                                    <span>Cadastrar Cliente</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>

                    {/* FOOTER */}
                    <SidebarFooter className="border-t">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton>
                                            <Settings className="h-5 w-5" />
                                            <span>Configurações</span>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="top"
                                        className="w-[--radix-popper-anchor-width]"
                                    >
                                        <DropdownMenuItem>
                                            <span>Account</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 p-4">{children}</main>
            </SidebarProvider>
        </div >
    );
}
