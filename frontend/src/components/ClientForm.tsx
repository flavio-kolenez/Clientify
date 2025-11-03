import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { SearchCheck } from "lucide-react"
import { InputOTPCep } from "./InputOTPCep"

export function ClientForm() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Cadastro de clientes</CardTitle>
        <CardDescription>
          Preencha as informações do cliente!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="number"
              placeholder="Digite o telefone do cliente"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="document">CPF / CNPJ</Label>
            <Input
              id="document"
              type="text"
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cep">CEP</Label>
            <div className="flex w-full max-w-sm items-center gap-4">
              <InputOTPCep />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-10 h-10 flex items-center justify-center"
                    >
                      <SearchCheck className="w-6 h-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-neutral-900 text-white px-3 py-1 rounded-md mb-2 shadow-lg">
                    <p>Validar CEP</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </CardFooter>
    </Card>
  )
}