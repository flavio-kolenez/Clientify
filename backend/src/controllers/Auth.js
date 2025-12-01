import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshTokenSchema.js";

const SECRET_KEY = process.env.JWT_SECRET;

export default class AuthController {
  async generateToken(req, res) {
    const { client_id, client_secret } = req.body;

    if (client_id === process.env.CLIENT_ID && client_secret === process.env.CLIENT_SECRET) {
      // gerar o acess & refresh token, 'assinando' a encriptação com a secret_key
      // para validar o token depois, utilize o metodo verify,
      // passando token e a exata mesma key
      const accessToken = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "1h" });
      const refreshToken = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "7d" });

      // Salva o refresh token no banco
      await this.#createUserRefreshToken(refreshToken, client_id);

      return res.json({
        status: "success",
        token_type: "Bearer",
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: 3600 // 1 hora em segundos
      });
    }

    return res.status(401).json({
      status: "error",
      message: "Credencias inválidas."
    });
  };

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: "error",
        message: "Refresh token é obrigatório"
      });
    }

    try {
      // valida o token gerado pelo .sign()
      const decoded = jwt.verify(refreshToken, SECRET_KEY);
      
      // Verificar se o decoded tem os dados esperados
      if (!decoded.client_id) {
        return res.status(401).json({
          status: "error",
          message: "Token inválido - dados inconsistentes"
        });
      };

      // procura esse token no banco
      const RefreshTokenExists = await RefreshToken.findOne({ 
        token: refreshToken, 
        is_revoked: false 
      });

      if (!RefreshTokenExists) {
        return res.status(401).json({
          status: "error",
          message: "Refresh token inválido ou revogado"
        });
      };

      // Gerar novo access token usando o client_id do token decodificado
      const newAccessToken = jwt.sign({ client_id: decoded.client_id }, SECRET_KEY, { expiresIn: "1h" });

      return res.json({
        status: "success",
        access_token: newAccessToken,
        token_type: "Bearer",
        expires_in: 3600 // 1 Hora
      });
      
    } catch (error) {
      // jwt.verify vai dar erro se token estiver expirado ou inválido
      return res.status(401).json({
        status: "error",
        message: "Refresh token expirado ou inválido"
      });
    };
  }

  async #createUserRefreshToken(refreshToken, clientId) {
    try {
      const tokenData = {
        token: refreshToken,
        client_id: clientId,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
      };

      const response = await RefreshToken.create(tokenData);

      return {
        status: "success",
        message: "Refresh token criado com sucesso!",
        response: response,
      };

    } catch (error) {
      console.error("Erro ao salvar refresh token:", error);
      return {
        status: "error",
        message: "Erro ao criar o refresh token!",
        error: error.message,
      };
    };
  }
}