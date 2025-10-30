import express from "express";
import ClientController from "../controllers/Client.js";

const router = express.Router();

router
    .post("/client", ClientController.createClient)
    .get("/client", ClientController.getAllClients)
    .get("/client/:id", ClientController.getClientById)
    .put("/client/:id", ClientController.updateClient)
    .delete("/client/:id", ClientController.deleteClient)


export default router;