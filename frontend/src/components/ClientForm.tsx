import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip"
import { SearchCheck } from "lucide-react"
import { InputOTPCep } from "./InputOTPCep"
import { api } from "../../services/api"
import { validateCep } from "../../services/addressServices"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

// Schema de validação
const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  document: z.string().min(11, "Documento deve ter pelo menos 11 caracteres"),
  cep: z.string().length(8, "CEP inválido! Deve conter 8 dígitos numéricos."),
  clientType: z.enum(["CPF", "CNPJ"]),
});

type FormValues = z.infer<typeof formSchema>

export function ClientForm() {
  // ----------------------------- ESTADOS ---------------------------------
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"success" | "error" | null>(null)
  const [dialogMessage, setDialogMessage] = useState("")

  const [cepStatus, setCepStatus] = useState<"default" | "valid" | "invalid">(
    "default"
  )
  const [formError, setFormError] = useState<string | null>(null)

  // ----------------------------- FORM HOOK ---------------------------------
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      document: "",
      cep: "",
      clientType: "CPF",
    },
  })

  // ----------------------------- FUNÇÕES ---------------------------------
  const handleValidateCep = async (cep: string) => {
    try {
      const res = await validateCep(cep)
      if (res.error) {
        setCepStatus("invalid")
        form.setError("cep", {
          type: "manual",
          message: res.message || "Erro ao validar CEP",
        })
        return false
      }
      setCepStatus("valid")
      form.clearErrors("cep")
      return true
    } catch (err) {
      setCepStatus("invalid")
      form.setError("cep", {
        type: "manual",
        message: "Erro ao validar CEP",
      })
      console.error("Erro ao validar CEP:", err)
      return false
    };
  };

  // ----------------------------- SUBMIT ---------------------------------
  const onSubmit = async (values: FormValues) => {
    setFormError(null);

    // Valida o CEP e bloqueia se inválido
    const isCepValid = await handleValidateCep(values.cep)
    if (!isCepValid) {
      setDialogType("error")
      setDialogMessage("CEP inválido. Verifique antes de enviar.")
      setDialogOpen(true)
      return
    }

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      document: values.document,
      clientType: values.clientType,
      address: {
        postalCode: values.cep,
      },
    };

    try {
      const res = await api.post("/client", payload);

      if (res.status === 201) {
        setDialogType("success")
        setDialogMessage("Cliente cadastrado com sucesso!")
        form.reset()
        setCepStatus("default")
      } else {
        setDialogType("error")
        setDialogMessage("Erro inesperado ao cadastrar cliente.")
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors
        Object.entries(errors).forEach(([field, message]) => {
          form.setError(field as keyof FormValues, {
            message: String(message),
          })
        })
      } else if (err.response?.data?.message) {
        setFormError(err.response.data.message)
        setDialogMessage(err.response.data.message)
      } else {
        setFormError("Erro ao cadastrar cliente.")
        setDialogMessage("Erro ao cadastrar cliente.")
      }

      setDialogType("error")
    } finally {
      setDialogOpen(true)
    }
  }

  return (
    <>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>Cadastro de clientes</CardTitle>
          <CardDescription>
            Preencha as informações do cliente!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Digite o email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPF / CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <div className="flex w-full max-w-sm items-center gap-4">
                      <FormControl>
                        <InputOTPCep
                          value={field.value}
                          onChange={(val) => {
                            field.onChange(val)
                            setCepStatus("default")
                          }}
                          status={cepStatus}
                        />
                      </FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="w-10 h-10 flex items-center justify-center"
                              onClick={() => handleValidateCep(field.value)}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {formError && (
                <div className="mb-2">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-xs">
                    {formError}
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Enviar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogType === "success" ? "Sucesso" : "Erro"}
            </AlertDialogTitle>
            <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialogOpen(false)}>
              Fechar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}