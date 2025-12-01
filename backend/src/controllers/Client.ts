import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Client from "../models/ClientSchema.js";
import { IClient } from "../types/index.js";
import { validateDocument } from "../utils/validateDocument.js";

interface PaginatedResponse extends Response {
  paginatedResults?: {
    status: string;
    data: IClient[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

interface ClientQuery {
  name?: string;
  email?: string;
  document?: string;
  clientType?: "CPF" | "CNPJ";
  isActive?: string;
  createdBefore?: string;
  createdAfter?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  page?: string;
  limit?: string;
}

class ClientController {
  static async createClient(req: Request, res: Response, next: NextFunction): Promise<void> {
    const clientData: Partial<IClient> = req.body;
    const { clientType, document } = clientData;

    if (clientType && document) {
      validateDocument(clientType, document, res);
    }

    try {
      const response = await Client.create(clientData);

      res.status(201).json({
        status: "success",
        data: response,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getAllClients(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const clients = await Client.find();
      res.status(200).json({
        status: "success",
        data: clients,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getFilteredClients(req: Request<{}, any, any, ClientQuery>, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        name,
        email,
        document,
        clientType,
        isActive,
        createdBefore,
        createdAfter,
        sortBy = "createdAt",
        sortDir = "desc",
        page = "1",
        limit = "20",
      } = req.query;

      // Construção dos filtros
      const filters: any = {};

      if (name) filters.name = { $regex: name, $options: "i" };
      if (email) filters.email = { $regex: email, $options: "i" };
      if (document) filters.document = document;
      if (clientType) filters.clientType = clientType;
      if (isActive !== undefined) {
        if (isActive === "true") filters.isActive = true;
        else if (isActive === "false") filters.isActive = false;
      }

      if (createdAfter || createdBefore) {
        filters.createdAt = {};
        if (createdAfter) filters.createdAt.$gte = new Date(createdAfter);
        if (createdBefore) filters.createdAt.$lte = new Date(createdBefore);
        if (Object.keys(filters.createdAt).length === 0) delete filters.createdAt;
      }

      const pageNum: number = Math.max(parseInt(page, 10) || 1, 1);
      const perPage: number = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);

      const sort: any = {};
      sort[sortBy] = sortDir === "asc" ? 1 : -1;

      // Faz a contagem total e busca paginada em paralelo
      const [total, clients] = await Promise.all([
        Client.countDocuments(filters),
        Client.find(filters)
          .sort(sort)
          .skip((pageNum - 1) * perPage)
          .limit(perPage)
      ]);

      res.status(200).json({
        status: "success",
        data: clients,
        meta: {
          total,
          page: pageNum,
          limit: perPage,
          totalPages: Math.ceil(total / perPage)
        }
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  static async getClientById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        status: "fail", 
        message: "ID inválido" 
      });
    }

    try {
      const client = await Client.findById(id);

      if (!client) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      }

      res.status(200).json({
        status: "success",
        data: client,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  static async deleteClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { id } = req.params;

    try {
      const deletedClient = await Client.findByIdAndDelete(id);

      if (!deletedClient) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      }

      res.status(200).json({
        status: "success",
        message: `Cliente ${deletedClient.name} deletado com sucesso!`,
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  static getPaginatedClients = (req: Request, res: PaginatedResponse): Response => {
    return res.status(200).json(res.paginatedResults);
  };

  static async updateClient(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { id } = req.params;
    const updateData: Partial<IClient> = req.body;
    const { clientType, document } = updateData;

    if (clientType && document) {
      validateDocument(clientType, document, res);
    }

    try {
      const updatedClient = await Client.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedClient) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      }

      res.status(200).json({
        status: "success",
        data: updatedClient,
      });
    } catch (error: unknown) {
      console.log(error);
      next(error);
    }
  }
}

export default ClientController;