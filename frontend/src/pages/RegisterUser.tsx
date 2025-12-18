import RegisterForm from "@/components/forms/RegisterForm";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function RegisterUser() {
    return (
        <>
            <div className="relative mb-4">
                <SidebarTrigger className="absolute mt-0 left-0 top-1/2 -translate-y-1/2" />
                <h1 className="text-center text-2xl font-bold">Registrar novo usuário</h1>
            </div>


            <hr />

            <div className="flex justify-center mt-5">
                <RegisterForm />
            </div>
        </>
    );
}
