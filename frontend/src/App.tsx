import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AddClients } from "./pages/AddClientsPage";
import { ListClients } from "./pages/ListClientsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas que usam o Layout base */}
        <Route element={<Layout />}>
          <Route path="/" element={ <ListClients />} />
          <Route path="/clients/addClient" element={<AddClients />} />
          <Route path="/clients/list" element={<ListClients />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
