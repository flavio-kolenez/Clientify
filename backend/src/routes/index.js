import express from "express";
import clientRoutes from "./clientRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/client", clientRoutes);
router.use("/user", userRoutes);

export default router;