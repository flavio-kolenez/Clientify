import express from "express";
import ClientController from "../controllers/Client.js";
import { paginate } from "../middlewares/paginate.js";
import ClientSchema from "../models/ClientSchema.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router
  .get("/paginated", authMiddleware, paginate(ClientSchema), ClientController.getPaginatedClients)
  .get("/filtered", authMiddleware, ClientController.getFilteredClients)
  .get("/", authMiddleware, ClientController.getAllClients)
  .post("/", authMiddleware, ClientController.createClient)
  .get("/:id", authMiddleware, ClientController.getClientById)
  .put("/:id", authMiddleware, ClientController.updateClient)
  .delete("/:id", authMiddleware, ClientController.deleteClient);

export default router;
