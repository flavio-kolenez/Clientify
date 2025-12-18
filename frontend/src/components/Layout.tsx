import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarComponent } from "./SidebarComponent";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarProvider>
        <SidebarComponent />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
}
