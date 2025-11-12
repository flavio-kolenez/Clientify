import express from "express";
import ClientController from "../controllers/Client.js";
import { paginate } from "../middlewares/paginate.js";
import ClientSchema from "../models/ClientSchema.js";

const router = express.Router();

router
  .get("/client/paginated", paginate(ClientSchema), ClientController.getPaginatedClients) 
  .get("/client/filtered", ClientController.getFilteredClients)
  .get("/client", ClientController.getAllClients) 
  .post("/client", ClientController.createClient)
  .get("/client/:id", ClientController.getClientById) 
  .put("/client/:id", ClientController.updateClient)
  .delete("/client/:id", ClientController.deleteClient);

export default router;
