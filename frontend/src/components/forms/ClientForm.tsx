import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { InputOTPCep } from "@/components/InputOTPCep"
import { ActiveStatusBadge } from "@/components/ActiveStatusBadge"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";

import { api } from "../../../services/api";
import { validateCep } from  "../../../services/addressServices";
import { formatDocument } from "@/utils/utils";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  document: z.string().refine((doc) => {
    // Remove caracteres não numéricos para validar apenas os dígitos
    const numbers = doc.replace(/\D/g, "");
    // CPF deve ter 11 dígitos, CNPJ deve ter 14 dígitos
    return numbers.length === 11 || numbers.length === 14;
  }, "Documento inválido. CPF deve ter 11 dígitos, CNPJ deve ter 14 dígitos"),
  cep: z.string().length(8, "CEP inválido! Deve conter 8 dígitos numéricos."),
  street: z.string().min(2, "Rua obrigatória"),
  city: z.string().min(2, "Cidade obrigatória"),
  state: z.string().length(2, "Selecione o estado"),
  clientType: z.enum(["CPF", "CNPJ"]),
});

type FormValues = z.infer<typeof formSchema>

interface ClientFormProps {
  title?: string;
  description?: string;
  initialData?: Partial<FormValues>;
  onSuccess?: () => void;
  isEditMode?: boolean;
  clientId?: string;
  showCard?: boolean; 
  showInternalAlert?: boolean;
  isActive?: boolean; 
  onActiveChange?: (isActive: boolean) => void; 
}

export function ClientForm({
  title = "Cadastro de clientes",
  description = "Preencha as informações do cliente!",
  initialData = {},
  onSuccess,
  isEditMode = false,
  clientId,
  showCard = true,
  showInternalAlert = true,
  isActive = true,
  onActiveChange
}: ClientFormProps) {
  const states = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
  ];

  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"success" | "error" | null>(null)
  const [dialogMessage, setDialogMessage] = useState("")

  const [cepStatus, setCepStatus] = useState<"default" | "valid" | "invalid">(
    "default"
  )
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      document: initialData.document || "",
      cep: initialData.cep || "",
      street: initialData.street || "",
      city: initialData.city || "",
      state: initialData.state || "",
      clientType: initialData.clientType || "CPF",
    },
  });

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
      // Preencher automaticamente os campos de endereço
      if (res.logradouro) form.setValue("street", res.logradouro)
      if (res.localidade) form.setValue("city", res.localidade)
      if (res.uf) form.setValue("state", res.uf)
      return true
    } catch (err) {
      setCepStatus("invalid")
      form.setError("cep", {
        type: "manual",
        message: "Erro ao validar CEP",
      })
      console.error("Erro ao validar CEP:", err)
      return false
    }
  }

  const onSubmit = async (values: FormValues) => {
    setFormError(null);

    // Validação adicional do documento antes do envio
    const numbersOnly = values.document.replace(/\D/g, "");
    if (numbersOnly.length !== 11 && numbersOnly.length !== 14) {
      setDialogType("error")
      setDialogMessage("Documento inválido. CPF deve ter 11 dígitos, CNPJ deve ter 14 dígitos.")
      setDialogOpen(true)
      return
    }

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
        street: values.street,
        city: values.city,
        state: values.state,
      },
    };

    try {
      let res;
      if (isEditMode && clientId) {
        res = await api.put(`/client/${clientId}`, payload);
      } else {
        res = await api.post("/client", payload);
      }

      if (res.status === 200 || res.status === 201) {
        if (showInternalAlert) {
          setDialogType("success")
          setDialogMessage(isEditMode ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!")
        }
        if (!isEditMode) {
          form.reset()
          setCepStatus("default")
        }
        onSuccess?.();
      } else {
        if (showInternalAlert) {
          setDialogType("error")
          setDialogMessage("Erro inesperado ao processar cliente.")
        }
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
        if (showInternalAlert) {
          setDialogMessage(err.response.data.message)
        }
      } else {
        setFormError(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente.`)
        if (showInternalAlert) {
          setDialogMessage(`Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente.`)
        }
      }

      if (showInternalAlert) {
        setDialogType("error")
      }
    } finally {
      if (showInternalAlert) {
        setDialogOpen(true)
      }
    }
  }

  const FormContent = (
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
                <Input maxLength={10} placeholder="Digite o telefone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="document"
          render={({ field }) => {
            const documentValue = form.watch("document")
            // Remove caracteres não numéricos para validar apenas os dígitos
            const numbersOnly = documentValue.replace(/\D/g, "")
            const isValidCPF = numbersOnly.length === 11
            const isValidCNPJ = numbersOnly.length === 14

            return (
              <FormItem>
                <FormLabel>CPF / CNPJ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o documento"
                    maxLength={18}
                    {...field}
                    onChange={(e) => {
                      const { formatted, type } = formatDocument(e.target.value)
                      field.onChange(formatted)
                      if (type === "CPF" || type === "CNPJ") {
                        form.setValue("clientType", type)
                      }
                    }}
                  />
                </FormControl>

                {(isValidCPF || isValidCNPJ) && (
                  <div className="text-xs text-green-600">
                    Tipo detectado: {form.watch("clientType")} ✓
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <div className={`flex w-full items-center gap-2 ${showCard ? 'max-w-sm' : ''}`}>
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
                        className="w-10 h-10 flex items-center justify-center shrink-0"
                        onClick={() => handleValidateCep(field.value)}
                      >
                        <SearchCheck className="w-4 h-4" />
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

        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder="Digite a rua" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="Cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent className="max-h-52">
                    {states.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditMode && onActiveChange && (
          <div className="mb-4">
            <ActiveStatusBadge
              value={isActive}
              onChange={onActiveChange}
            />
          </div>
        )}

        {formError && (
          <div className="mb-2">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-xs">
              {formError}
            </div>
          </div>
        )}

        <Button type="submit" className="w-full">
          {isEditMode ? "Atualizar" : "Enviar"}
        </Button>
      </form>
    </Form>
  );

  return (
    <>
      {showCard ? (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent>
            {FormContent}
          </CardContent>
        </Card>
      ) : (
        <div className="w-full space-y-4">
          {FormContent}
        </div>
      )}

      {showInternalAlert && (
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {dialogType === "success" ? "Sucesso ✅" : "Erro ❌"}
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
      )}
    </>
  )
}