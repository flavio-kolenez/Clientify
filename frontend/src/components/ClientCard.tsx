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
import { Mail, Phone, MapPin, Trash2, Heart, Pencil, Check, Ellipsis } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
}


export function ClientCard({ client, onDelete }: ClientCardProps) {
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
              variant={client.isActive ? "default" : "secondary"}
              className={
                client.isActive
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-white"
              }
            >
              {client.isActive ? "Ativo" : "Inativo"}
            </Badge>
            <Badge variant="outline" className="text-xs">
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
        <Ellipsis className="text-neutral-500 ml-2 hover:animate-bounce hover:text-neutral-900" size={15}/>

        <div className="gap-2 flex">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-xs h-8 px-2 bg-red-600 text-white hover:bg-red-700 hover:text-white"

              >
                <Trash2 size={14} />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[400px]">
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir <b>{client.name}</b>?
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

            {/* tem que atualizar essa bomba pra usar o SheetComponent!!! */}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline"
                size="sm"
                className="text-xs h-8 px-2 bg-violet-600 hover:bg-violet-700 hover:text-white text-white"
              >
                <Pencil />
                Editar
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mt-0">
                <SheetTitle>Editar perfil do cliente</SheetTitle>
                <SheetDescription>
                  Digite os novos dados do cliente!
                </SheetDescription>
              </SheetHeader>

              <div className="grid flex-1 auto-rows-min mt-5 gap-5 px-4">
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-name">Name</Label>
                  <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="sheet-demo-username">Username</Label>
                  <Input id="sheet-demo-username" defaultValue="@peduarte" />
                </div>
              </div>
              <SheetFooter className="mt-5 flex !justify-around">
                <AlertDialog>
                  <SheetClose asChild>
                    <Button variant="outline">Cancelar</Button>
                  </SheetClose>

                  <AlertDialogTrigger asChild>
                    <Button variant="outline"
                      className="text-sm bg-emerald-500 hover:bg-emerald-600 text-white hover:text-white"
                    >
                      <Check /> Confirmar alterações
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="sm:max-w-[400px]">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar alterações</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja alterar os <br /> dados do cliente <b>{client.name}</b>?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete && onDelete(client._id)}
                        className="bg-emerald-500 hover:bg-emerald-600"
                      >
                        <Check />
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
</div>
      </CardFooter>
    </Card>
  )
}
