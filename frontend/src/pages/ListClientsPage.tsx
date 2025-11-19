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
import { ClientFilters } from "@/components/ClientFilters";

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
  const [authError, setAuthError] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const errorData = {
    erro: "Erro de autenticação",
    description: "Credencial invalida ou expirada, faça login novamente!",
    icon: "Ticket-x"
  }

  const fetchClients = async (pageNumber = 1) => {
    try {
      const res = await api.get(`/client/paginated?page=${pageNumber}&limit=6`);
      const clientsData = res.data?.data ?? [];
      setClients(clientsData);

      // Verificar se há próxima página checando a próxima página
      if (clientsData.length === 6) {
        try {
          const nextPageRes = await api.get(`/client/paginated?page=${pageNumber + 1}&limit=6`);
          setHasNextPage(nextPageRes.data?.data?.length > 0);
        } catch {
          setHasNextPage(false);
        }
      } else {
        setHasNextPage(false);
      }
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
        setClients([]);
      }
    }
  };

  const fecthFilteredClients = async (
    filters: Record<string, string | number | boolean | null | undefined> = {}
  ) => {
    const params = new URLSearchParams(
      Object.entries(filters)
        .filter(([_, v]) => v !== null && v !== undefined && v !== "")
        .map(([k, v]) => [k, String(v)])
    ).toString();

    const res = await api.get(`/client/filtered?${params}`);
    setClients(res.data.data);
  };

  const renderClients = () => {
    if (clients.length > 0) {
      return clients.map((client) => (
        <ClientCard
          key={client._id}
          client={client}
          onDelete={handleDelete}
          onUpdate={() => fetchClients(page)}
        />
      ));
    } else {
      return (
        <div className="flex justify-center">
          <EmptyComponent errorObj={authError ? errorData : undefined} />
        </div>
      );
    }
  };

  useEffect(() => {
    fetchClients(page);
  }, [page]); const handleDelete = async (id: string) => {
    try {
      await api.delete(`/client/${id}`);

      // Recarrega a página atual
      const res = await api.get(`/client/paginated?page=${page}&limit=6`);
      const newClients = res.data?.data ?? [];

      // Se a página atual ficou vazia e não é a primeira página, volta uma página
      if (newClients.length === 0 && page > 1) {
        setPage(page - 1);
        fetchClients(page - 1);
      } else {
        setClients(newClients);
        // Atualizar hasNextPage verificando se a próxima página tem dados
        if (newClients.length === 6) {
          try {
            const nextPageRes = await api.get(`/client/paginated?page=${page + 1}&limit=6`);
            setHasNextPage(nextPageRes.data?.data?.length > 0);
          } catch {
            setHasNextPage(false);
          }
        } else {
          setHasNextPage(false);
        }
      }
    } catch (err: any) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
      }
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
          <ClientFilters onApply={(filters) => {
            if (filters === null) {
              // filtros limpos: manter paginação atual
              fetchClients(page);
            } else {
              // aplicar filtros: ir para a primeira página com os filtros
              setPage(1);
              fecthFilteredClients(filters);
            }
          }}
          />
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[1fr]">
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
                  disabled={!hasNextPage}
                  className={!hasNextPage ? "pointer-events-none opacity-50 px-3 py-1 rounded" : "px-3 py-1 rounded"}
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
          <EmptyComponent errorObj={authError ? errorData : undefined} />
        </div>
      )
      }
    </>
  );
}
