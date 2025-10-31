import { Layout } from "@/components/Layout";

import { SidebarTrigger } from "@/components/ui/sidebar"
import { ClientForm } from "@/components/ClientForm"

function App() {
  return (
    <Layout>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl text-bold">Clientes</h1>
      </div>

      <hr />

      <div className="flex justify-center mt-5">
       <ClientForm />
      </div>
    </Layout>
  );
};

export default App;