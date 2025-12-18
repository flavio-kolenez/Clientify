import { SidebarTrigger } from "@/components/ui/sidebar"
import { ClientForm } from "@/components/forms/ClientForm"

export function AddClients() {
  return (
    <>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl font-bold">Clientes</h1>
      </div> 

      <hr />

      <div className="flex justify-center mt-5">
        <ClientForm />
      </div>
    </>
  );
}
