import express from "express";
import clientRoutes from "./clientRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/client", clientRoutes);

export default router;