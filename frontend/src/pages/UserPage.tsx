import { SidebarTrigger } from "@/components/ui/sidebar";

export function UserPage() {
  return (
    <>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl font-bold"></h1>
      </div> 

      <hr />

      Dados do usuario...
    </>
  );
}
