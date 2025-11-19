import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AddClients } from "./pages/AddClientsPage";
import { ListClients } from "./pages/ListClientsPage";
import { useEffect } from "react";
import { api } from "../services/api";

function App() {
  useEffect(() => {
    async function initAuth() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          const payload = {
            client_id: import.meta.env.VITE_CLIENT_ID,
            client_secret: import.meta.env.VITE_CLIENT_SECRET,
          };
          const res = await api.post("/auth/token", payload, {
            headers: { "Content-Type": "application/json" },
          });

          if (res.data?.token) {
            localStorage.setItem("token", res.data.token);
          }
        }
      } catch (err) {
        console.error("Erro ao obter token:", err);
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
