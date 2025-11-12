import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Trash2, Heart, Pencil, MoreHorizontal } from "lucide-react"
import { ClientForm } from "./ClientForm"
import { SheetComponent } from "./SheetComponent"
import { api } from "../../services/api"
import { FormLabel } from "./ui/form"

interface ClientCardProps {
  client: {
    _id: string
    clientType: "CPF" | "CNPJ"
    document: string
    name: string
    email: string
    phone: string
    address: {
      postalCode: string
      street: string
      city: string
      state: string
    }
    isActive: boolean
  }
  onDelete?: (id: string) => void
  onUpdate?: (id: string) => void // Nova prop para callback quando atualizar
}


export function ClientCard({ client, onDelete, onUpdate }: ClientCardProps) {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isActive, setIsActive] = useState(client.isActive);

  const initial = client.name.charAt(0).toUpperCase()
  const isTata = ["Tata", "Thainara", "Tata <3"].includes(client.name)

  const bgColors = [
    "bg-pink-100 text-pink-600",
    "bg-rose-100 text-rose-600",
    "bg-purple-100 text-purple-600",
    "bg-blue-100 text-blue-600",
    "bg-teal-100 text-teal-600",
    "bg-amber-100 text-amber-600",
    "bg-green-100 text-green-600",
  ];

  const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)]

  const handleEditSuccess = () => {
    setIsEditSheetOpen(false);
    setShowSuccessAlert(true);
    onUpdate?.(client._id);
  };

  const handleStatusChange = async (newStatus: boolean) => {
    try {
      await api.put(`/client/${client._id}`, { isActive: newStatus });
      setIsActive(newStatus);
      onUpdate?.(client._id);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      setIsActive(!newStatus);
    }
  };

  return (
    <Card className="w-full h-full min-h-[200px] flex flex-col justify-between hover:shadow-lg transition-shadow overflow-hidden">
      <CardHeader className="p-5 pb-1">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 text-lg font-semibold tracking-tight">
              {isTata ? (
                <div className="flex items-center justify-center h-full w-full bg-pink-100 text-pink-600">
                  <Heart size={18} fill="currentColor" className="animate-pulse" />
                </div>
              ) : (
                <>
                  <AvatarFallback className={randomColor}>
                    {initial}
                  </AvatarFallback>
                </>
              )}
            </Avatar>

            <div>
              <CardTitle className="text-base font-semibold capitalize leading-none truncate max-w-[180px]">
                {client.name}
              </CardTitle>

              <CardDescription className="text-xs truncate max-w-[180px]">
                {client.document}
              </CardDescription>

            </div>
          </div>

          <div className="flex flex-col gap-1 text-right">
           <Badge
              variant="outline"
              className={
                isActive
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }
            >
              {isActive ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant="outline" className="text-xs d-flex justify-center">
              {client.clientType}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-1 space-y-1 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail size={14} />
          <span>{client.email}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone size={14} />
          <span>{client.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin size={14} />
          <span>
            {client.address.street}, {client.address.city} - {client.address.state}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-1 flex justify-between gap-2 mt-auto">
        <MoreHorizontal className="text-neutral-500 ml-2 hover:animate-bounce hover:text-neutral-900" size={15} />

        <div className="gap-2 flex">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs h-8 px-2 border-red-600 text-red-600 hover:bg-red-100 hover:text-red-700"

              >
                <Trash2 size={14} />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[400px]">
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o cliente <i><b>{client.name}</b></i>? <br />
                  Essa ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onDelete && onDelete(client._id)}
                  className="bg-red-700 hover:bg-red-800"
                >
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <SheetComponent
            open={isEditSheetOpen}
            onOpenChange={setIsEditSheetOpen}
            trigger={
              <Button variant="outline"
                size="sm"
                className="text-xs h-8 px-2 border-violet-600 text-violet-600 hover:bg-violet-100 hover:text-violet-700"
              >
                <Pencil />
                Editar
              </Button>
            }
            title="Editar Cliente"
            description={`Atualize as informações do cliente ${client.name} abaixo.`}
          >
            <ClientForm
              showCard={false}
              isEditMode={true}
              clientId={client._id}
              onSuccess={handleEditSuccess}
              showInternalAlert={false}
              isActive={isActive}
              onActiveChange={handleStatusChange}
              initialData={{
                name: client.name,
                email: client.email,
                phone: client.phone,
                document: client.document,
                clientType: client.clientType,
                cep: client.address.postalCode,
                street: client.address.street,
                city: client.address.city,
                state: client.address.state,
              }}
            />
          </SheetComponent>
        </div>
      </CardFooter>

      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sucesso ✅</AlertDialogTitle>
            <AlertDialogDescription>
              Cliente atualizado com sucesso!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSuccessAlert(false)}>
              Fechar
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
