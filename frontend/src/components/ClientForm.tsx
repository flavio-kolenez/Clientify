import { useState } from "react"
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
import { api } from "../../services/api"

type FormFields = "name" | "email" | "phone" | "document" | "cep" | "clientType"

export function ClientForm() {
  const fieldLabels: Record<string, string> = {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    document: "CPF / CNPJ",
    postalCode: "CEP",
  }

  const fields: FormFields[] = ["name", "email", "phone", "document"];

  const [formData, setFormData] = useState<Record<FormFields, string>>({
    name: "",
    email: "",
    phone: "",
    document: "",
    cep: "",
    clientType: "CPF"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      document: formData.document,
      clientType: formData.clientType,
      address: {
        postalCode: formData.cep
      }
    };

    try {
      const res = await api.post("/client", payload);

      console.log("✅ Cliente cadastrado:", res.data);
      alert("Cliente cadastrado com sucesso!");
      setFormData({ name: "", email: "", phone: "", document: "", cep: "", clientType: "CPF" });
    } catch (err) {

      console.error(err);
      alert("Erro ao cadastrar cliente.");
    }
  };



  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle>Cadastro de clientes</CardTitle>
        <CardDescription>
          Preencha as informações do cliente!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className="grid gap-2">
              <Label htmlFor={field}>{fieldLabels[field] || field}</Label>
              <Input
                id={field}
                type={ field === "email" ? "email" : "text" }
                placeholder={`Digite o ${fieldLabels[field]?.toLowerCase() || field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="grid gap-2">
            <Label htmlFor="cep">CEP</Label>
            <div className="flex w-full max-w-sm items-center gap-4">
              <InputOTPCep
                value={formData.cep}
                onChange={(val) => setFormData({ ...formData, cep: val })}
                onComplete={(formatted) =>
                  setFormData({ ...formData, cep: formatted })
                }
              />
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

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}