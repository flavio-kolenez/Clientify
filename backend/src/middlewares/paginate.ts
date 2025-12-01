import { Request, Response, NextFunction } from "express";
import { Model, Document } from "mongoose";

interface PaginatedResponse<T> extends Response {
  paginatedResults?: {
    total: number;
    page: number;
    totalPages: number;
    data: T[];
  };
}

interface PaginationQuery {
  page?: string;
  limit?: string;
}

export const paginate = <T extends Document>(model: Model<T>) => {
  return async (req: Request<{}, any, any, PaginationQuery>, res: PaginatedResponse<T>, next: NextFunction): Promise<void> => {
    try {
      const { page = "1", limit: queryLimit } = req.query;
      const limit = queryLimit ? parseInt(queryLimit, 10) : 6;
      const skip = (parseInt(page, 10) - 1) * limit;

      const [results, total] = await Promise.all([
        model.find().skip(skip).limit(limit),
        model.countDocuments()
      ]);

      res.paginatedResults = {
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / limit),
        data: results
      };

      next();
    } catch (error: unknown) {
      console.error("Paginate error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ 
        message: "Erro ao paginar dados", 
        error: errorMessage 
      });
    }
  };
};