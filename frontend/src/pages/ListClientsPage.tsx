import { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ClientCard } from "@/components/ClientCard";

import { api } from "../../services/api";

type Client = {
  _id: string;
  clientType: "CPF" | "CNPJ";
  document: string;
  name: string;
  email: string;
  phone: string;
  address: {
    postalCode: string;
    street: string;
    city: string;
    state: string;
  };
  isActive: boolean;
};

export function ListClients() {
  const [clients, setClients] = useState<Client[]>([]);

  const fetchClients = async () => {
    try {
      const res = await api.get("/client");
      const clientsData = res.data?.data ?? [];
      setClients(clientsData);
    } catch (err) {
      console.error("Erro na requisição:", err);
    }
  };

  const renderClients = () => {
    if (clients.length > 0) {
      return clients.map((client) => (
        <ClientCard key={client._id} client={client} onDelete={handleDelete} />
      ));
    } else {
      return (
        <p className="text-center text-gray-500 col-span-full">
          Nenhum cliente encontrado.
        </p>
      );
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/client/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Erro ao deletar cliente:", err);
    }
  };

  return (
    <>
      <div className="relative mb-4">
        <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-center text-2xl font-bold">Lista de clientes</h1>
      </div>

      <hr />

      <div className="p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
        { renderClients() }
      </div>
    </>
  );
}
