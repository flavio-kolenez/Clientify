import express from "express";
import UserController from "../controllers/UserController.js";
import { authMiddleware } from "../middlewares/auth.js";

const userController = new UserController();
const router = express.Router();

router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/me", authMiddleware, (req, res) => userController.getById(req, res));
router.put("/me", authMiddleware, (req, res) => userController.update(req, res));
router.delete("/me", authMiddleware, (req, res) => userController.delete(req, res));

export default router;
