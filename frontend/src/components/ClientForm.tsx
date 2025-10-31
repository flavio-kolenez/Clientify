import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

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

import { SearchCheck } from "lucide-react"

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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="flex w-full max-w-sm items-center gap-2">
        

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="submit" size="icon" variant="outline">
                      <SearchCheck className="w-6 h-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-neutral-900 text-white px-3 py-1 rounded-md mb-2 shadow-md">
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