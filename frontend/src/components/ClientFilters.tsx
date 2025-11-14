import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, ListFilter } from "lucide-react";

export function ClientFilters({ onApply }: { onApply: (filters: any | null) => void }) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    clientType: "",
    isActive: "",
  });

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    setOpen(false);
  };

  const handleClear = () => {
    setFilters({ name: "", email: "", clientType: "", isActive: "" });
    // envia null para indicar que os filtros foram limpos e a paginação deve ser mantida
    onApply(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="mt-4">
        <Button variant="outline" size="sm" className="flex items-center gap-2 ml-4">
          <ListFilter className="h-4 w-4" />
          Filtros
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4 space-y-3" align="start">
        <h4 className="font-medium text-sm mb-2">Filtrar clientes</h4>

        <Input
          placeholder="Nome"
          value={filters.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input
          placeholder="Email"
          value={filters.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Select
          onValueChange={(val) => handleChange("clientType", val)}
          value={filters.clientType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tipo (CPF/CNPJ)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CPF">CPF</SelectItem>
            <SelectItem value="CNPJ">CNPJ</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(val) => handleChange("isActive", val)}
          value={filters.isActive}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Ativo</SelectItem>
            <SelectItem value="false">Inativo</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex justify-end gap-2 pt-2 border-t">
          <Button variant="ghost" size="sm" onClick={handleClear}>
            Limpar
          </Button>
          <Button size="sm" onClick={handleApply}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
