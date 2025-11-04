
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
import { Pencil, Check} from "lucide-react"

export function SheetComponent() {
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
                                onClick={() => onEdit && onDelete(client._id)}
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
}    
