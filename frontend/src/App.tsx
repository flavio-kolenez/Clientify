import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AddClients } from "./pages/AddClientsPage";
import { ListClients } from "./pages/ListClientsPage";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import { api } from "../services/api";

function App() {
  useEffect(() => {
    async function initAuth() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        // Data de quando o token expira salva no localStorage
        const expiresAt = localStorage.getItem("accessTokenExpiresAt");

        // Função para verificar se token expirou
        const isTokenExpired = () => {
          if (!expiresAt) return true; // se nao tem data é pq expirou
          return Date.now() >= parseInt(expiresAt); 
          // compara o tempo atual x o tempo de expiração 
          // - Date.now > expiresAt? : expirou 
          // - Date.now < expiresAt? : valido
        };

        // Função para renovar access token
        const renewAccessToken = async () => {
          const res = await api.post("/auth/refresh", {
            refreshToken: refreshToken
          });
          
          localStorage.setItem("accessToken", res.data.access_token);
          const newExpiresAt = Date.now() + (res.data.expires_in * 1000);
          localStorage.setItem("accessTokenExpires", newExpiresAt.toString());
        };

        // Lógica principal
        if (!accessToken || !refreshToken) {
          // Fazer login inicial
          const payload = {
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
          };
          
          const res = await api.post("/auth/token", payload, {
            headers: { "Content-Type": "application/json" },
          });

          if (res.data?.access_token && res.data?.refresh_token) {
            localStorage.setItem("accessToken", res.data.access_token);
            localStorage.setItem("refreshToken", res.data.refresh_token);
            const expiresAt = Date.now() + (res.data.expires_in * 1000);
            localStorage.setItem("accessTokenExpiresAt", expiresAt.toString());
          }
        } else if (isTokenExpired()) {
          // Renovar token expirado
          await renewAccessToken();
        }
        
      } catch (err) {
        console.error("Erro ao obter token:", err);
        // Se der erro, limpar tudo e tentar login novamente
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpires");
      }
    }

    initAuth();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
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
