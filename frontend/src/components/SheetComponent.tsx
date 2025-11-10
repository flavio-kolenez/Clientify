
import { type ReactNode } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

interface SheetComponentProps {
    trigger: ReactNode;
    title: string;
    description?: string;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function SheetComponent({
    trigger,
    title,
    description,
    children,
    open,
    onOpenChange
}: SheetComponentProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent className="max-w-[500px] sm:max-w-[480px] overflow-y-auto">
                <SheetHeader className="mt-0">
                    <SheetTitle>{title}</SheetTitle>
                    {description && (
                        <SheetDescription>
                            {description}
                        </SheetDescription>
                    )}
                </SheetHeader>
                <div className="mt-6">
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    );
}
