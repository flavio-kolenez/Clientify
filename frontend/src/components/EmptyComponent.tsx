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
import { BookDashed, UserPlus } from "lucide-react";

export function EmptyComponent() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookDashed />
        </EmptyMedia>
        <EmptyTitle>Nenhum cliente!</EmptyTitle>
        <EmptyDescription>Nenhum cliente encontrado.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link to={"/clients/addClient"}>
          <Button>

            <UserPlus className="h-5 w-5" />
            <span>Cadastrar Cliente</span>
          </Button>

        </Link>
      </EmptyContent>
    </Empty>
  );
}