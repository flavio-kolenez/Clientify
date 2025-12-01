import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index.js";

const SECRET_KEY: string = process.env.JWT_SECRET!;

interface TokenPayload {
  client_id: string;
  iat?: number;
  exp?: number;
}

export function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void {
  const authHeader: string | undefined = req.headers.authorization;

  // Se não vier token envia um erro
  if (!authHeader) {
    return res.status(401).json({
      status: "error",
      message: "Token de autenticação não fornecido."
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    return res.status(400).json({
      status: "error",
      message: "Formato de token inválido."
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as TokenPayload;
    req.client = {
      id: decoded.client_id,
      client_id: decoded.client_id
    };
    next();
  } catch (error: unknown) {
    return res.status(403).json({
      status: "error",
      message: "Token inválido ou expirado."
    });
  }
}