import { useEffect, useState } from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import { ClientCard } from "@/components/ClientCard";

import { api } from "../../services/api";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { EmptyComponent } from "@/components/EmptyComponent";

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
  const [page, setPage] = useState(1);

  const fetchClients = async (pageNumber = 1) => {
    try {
      const res = await api.get(`http://localhost:3000/client/paginated?page=${pageNumber}&limit=6`);
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
        <div className="flex justify-center">
          <EmptyComponent />
        </div>
      );
    }
  };

  useEffect(() => {
    fetchClients(page);
  }, [page]);

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

      {clients.length > 0 ? (
        <>
          <div className="p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
            {renderClients()}
          </div>

          <Pagination className="mt-6 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50 px-3 py-1 rounded" : "px-3 py-1 rounded"}
                >
                  <div className="flex items-center gap-3">
                    <ArrowLeft /> Anterior
                  </div>
                </button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={clients.length < 6}
                  className={clients.length < 6 ? "pointer-events-none opacity-50 px-3 py-1 rounded" : "px-3 py-1 rounded"}
                >
                  <div className="flex items-center gap-3">

                    Próximo <ArrowRight />

                  </div>
                </button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      ) : (
          <div className="flex justify-center items-center h-[60vh]">
            <EmptyComponent />
          </div>
        )
      }
    </>
  );
}
