import express from "express";

import AuthController from "../controllers/Auth.js";

const authController = new AuthController();
const router = express.Router();

router.post("/token", (req, res) => authController.generateToken(req, res));
router.post("/refresh", (req, res) => authController.refreshToken(req, res));


export default router;