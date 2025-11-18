import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AddClients } from "./pages/AddClientsPage";
import { ListClients } from "./pages/ListClientsPage";
import { useEffect } from "react";
import { api } from "../services/api.ts";

function App() {

  // Assim que o app iniciar, verifica se já existe um token no localStorage
  // se nao existir ele bate no backend passando as credenciais para obter o token
  useEffect(() => {
    async function initAuth() {
      console.log("Iniciando autenticação...");
      const token = localStorage.getItem("token");
      console.log("Token encontrado:", token);

      if (!token) {
        // passa as credenciais para obter o token
        const payload = {
          client_id: import.meta.env.VITE_CLIENT_ID,
          client_secret: import.meta.env.VITE_CLIENT_SECRET,
        };

        console.log("Payload:", payload);

        // axios espera (url, data, config)
        const res = await api.post("/auth/token", payload, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Headers:",res.headers);

        const data = res.data;
        console.log("Resposta da autenticação:", data);
        if (data?.token) localStorage.setItem("token", data.token);
      }
    }

    initAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ListClients />} />
          <Route path="/clients/addClient" element={<AddClients />} />
          <Route path="/clients/list" element={<ListClients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
