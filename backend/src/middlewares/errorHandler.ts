import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

interface ValidationError {
  field: string;
  message: string;
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): Response => {
  if (err.name === "ValidationError") {
    const errors: ValidationError[] = Object.values(err.errors).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));

    console.error(errors);

    return res.status(400).json({
      status: "fail",
      errors,
    });
  }

  // Erro de duplicate key (MongoDB)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    return res.status(400).json({
      status: "fail",
      message: `${field} '${value}' já está em uso.`,
    });
  }

  // Erro de ObjectId inválido
  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      status: "fail",
      message: "ID inválido fornecido.",
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message || "Erro interno de servidor",
  });
};