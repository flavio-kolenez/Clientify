import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "./ui/button"


import { Link } from "react-router-dom";
import { BookDashed, UserPlus, TicketX } from "lucide-react";

export function EmptyComponent({
  erro,
  description,
  errorObj
}: {
  erro?: string,
  description?: string,
  errorObj?: { erro: string, description: string, icon?: string }
}) {
  const title = errorObj?.erro || erro || "Nenhum cliente!";
  const desc = errorObj?.description || description || "Nenhum cliente encontrado.";

  const getIcon = () => {
    if (errorObj?.icon === "Ticket-x") {
      return <TicketX />;
    }
    return <BookDashed />;
  };

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {getIcon()}
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>
          {desc}
        </EmptyDescription>
      </EmptyHeader>

      {!errorObj && !erro && (
        <EmptyContent>
          <Link to={"/clients/addClient"}>
            <Button>
              <UserPlus className="h-5 w-5" />
              <span>Cadastrar Cliente</span>
            </Button>
          </Link>
        </EmptyContent>
      )}
    </Empty>
  );
}