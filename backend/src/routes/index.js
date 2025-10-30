import express from "express";
import clientRoutes from "./clientRoutes.js";

const router = express.Router();

router.use(clientRoutes);

export default router;