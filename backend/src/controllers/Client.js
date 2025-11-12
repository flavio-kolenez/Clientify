import mongoose from "mongoose";
import ClientSchema from "../models/ClientSchema.js";

class ClientController {
  static async createClient(req, res, next) {
    const clientData = req.body;

    const { clientType, document } = clientData;

    if (clientType === "CPF" && !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(document)) {
      return res.status(400).json({
        status: "error",
        message: "CPF inválido: esperado o formato XXX.XXX.XXX-XX"
      });
    };

    if (clientType === "CNPJ" && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(document)) {
      return res.status(400).json({
        status: "error",
        message: "CNPJ inválido: esperado o formato XX.XXX.XXX/XXXX-XX"
      });
    };

    try {
      const response = await ClientSchema.create(clientData);

      res.status(201).json({
        status: "success",
        data: response,
      });

    } catch (error) {
      next(error);
    };
  };

  static async getAllClients(req, res, next) {
    try {
      const clients = await ClientSchema.find();
      res.status(200).json({
        status: "success",
        data: clients,
      });
    } catch (error) {
      next(error);
    };
  };

  static async getFilteredClients(req, res, next) {
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

      // Desconstruct dos parametros da query
      // Se estiverem settados, é atribuido aos filtros

      const filters = {};

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

      const pageNum = Math.max(parseInt(page, 10) || 1, 1);
      const perPage = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100); // max 100

      const sort = {};
      sort[sortBy] = sortDir === "asc" ? 1 : -1;


      // Faz a contagem total e busca paginada em paralelo
      // rodando as duas promisses ao mesmo tempo
      // ao invés de aguardar uma e depois a outra
      const [total, clients] = await Promise.all([
        ClientSchema.countDocuments(filters),
        ClientSchema.find(filters)
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
    } catch (error) {
      next(error);
    }
  };

  static async getClientById(req, res, next) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "fail", message: "ID inválido" });
    }

    try {
      const client = await ClientSchema.findById(id);

      if (client === null) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      } else {
        res.status(200).json({
          status: "success",
          data: client,
        });
      }
    } catch (error) {
      next(error);
    };
  };

  static async deleteClient(req, res, next) {
    const { id } = req.params;

    try {
      const deletedClient = await ClientSchema.findByIdAndDelete(id);

      if (!deletedClient) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      };

      res.status(200).json({
        status: "success",
        message: `Cliente ${deletedClient.name} deletado com sucesso!`,
      });
    } catch (error) {
      next(error);
    };
  };

  // controllers/clientController.js
  static getPaginatedClients = (req, res) => {
    res.status(200).json(res.paginatedResults);
  };

  static async updateClient(req, res, next) {
    const { id } = req.params;
    const updateData = req.body;

    // Validação manual do documento antes do update
    const { clientType, document } = updateData;

    if (clientType && document) {
      if (clientType === "CPF" && !/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(document)) {
        return res.status(400).json({
          status: "error",
          message: "CPF inválido: esperado o formato XXX.XXX.XXX-XX"
        });
      }

      if (clientType === "CNPJ" && !/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/.test(document)) {
        return res.status(400).json({
          status: "error",
          message: "CNPJ inválido: esperado o formato XX.XXX.XXX/XXXX-XX"
        });
      }
    }

    console.log(updateData);
    console.log(id);

    try {
      const updatedClient = await ClientSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedClient) {
        return res.status(404).json({
          status: "error",
          message: "Cliente não encontrado!"
        });
      };

      res.status(200).json({
        status: "success",
        data: updatedClient,
      });

    } catch (error) {
      console.log(error);
      next(error);
    };
  };
};

export default ClientController;