import { Layout } from "@/components/Layout";

import { SidebarTrigger } from "@/components/ui/sidebar"

function App() {
  return (
    <Layout>
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <SidebarTrigger />
          <h1 className="text-3xl font-bold">Dashbard</h1>
        </div>
        <p className="text-gray-700">Aqui vai o conteúdo principal da página ✨</p>
      </main>
    </Layout>
  );
}

export default App
