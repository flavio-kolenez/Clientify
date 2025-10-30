// src/components/layout.tsx
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"


type LayoutProps = {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar side="left">
                    <SidebarHeader className="px-4 py-2 border-b">
                        <h2 className="text-lg font-semibold">Menu</h2>
                    </SidebarHeader>
                    <SidebarContent className="p-4 space-y-2">
                        <Button variant="ghost" className="w-full justify-start"><Home className="h-1 w-1" /> Home</Button>
                    </SidebarContent>
                    <SidebarFooter className="p-4 border-t">
                        <Button variant="outline" className="w-full">Sair</Button>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 p-6">
                    {children} {/* 👈 Isso aqui é o que faz o conteúdo aparecer */}
                </main>
            </div>
        </SidebarProvider>
    )
}
