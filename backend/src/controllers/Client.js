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

  static async getClientById(req, res, next) {
    const { id } = req.params;

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