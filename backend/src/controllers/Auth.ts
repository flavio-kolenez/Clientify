import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import RefreshToken from "../models/RefreshTokenSchema.js";
import { IAuthTokens, IAuthRequest, IRefreshRequest } from "../types/index.js";

const SECRET_KEY: string = process.env.JWT_SECRET!;

interface TokenPayload {
  client_id: string;
  iat?: number;
  exp?: number;
}

export default class AuthController {
  async generateToken(req: Request<{}, any, IAuthRequest>, res: Response): Promise<Response> {
    const { client_id, client_secret } = req.body;

    if (client_id === process.env.CLIENT_ID && client_secret === process.env.CLIENT_SECRET) {
      // Gerar o access & refresh token, 'assinando' a encriptação com a secret_key
      // Para validar o token depois, utilize o método verify,
      // passando token e a exata mesma key
      const accessToken: string = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "1h" });
      const refreshToken: string = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "7d" });

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
      message: "Credenciais inválidas."
    });
  }

  async refreshToken(req: Request<{}, any, IRefreshRequest>, res: Response): Promise<Response> {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        status: "error",
        message: "Refresh token é obrigatório"
      });
    }

    try {
      // Valida o token gerado pelo .sign()
      const decoded = jwt.verify(refreshToken, SECRET_KEY) as TokenPayload;
      
      // Verificar se o decoded tem os dados esperados
      if (!decoded.client_id) {
        return res.status(401).json({
          status: "error",
          message: "Token inválido - dados inconsistentes"
        });
      }

      // Procura esse token no banco
      const refreshTokenExists = await RefreshToken.findOne({ 
        token: refreshToken, 
        is_revoked: false 
      });

      if (!refreshTokenExists) {
        return res.status(401).json({
          status: "error",
          message: "Refresh token inválido ou revogado"
        });
      }

      // Gerar novo access token usando o client_id do token decodificado
      const newAccessToken: string = jwt.sign({ client_id: decoded.client_id }, SECRET_KEY, { expiresIn: "1h" });

      return res.json({
        status: "success",
        access_token: newAccessToken,
        token_type: "Bearer",
        expires_in: 3600 // 1 Hora
      });
      
    } catch (error: unknown) {
      // jwt.verify vai dar erro se token estiver expirado ou inválido
      return res.status(401).json({
        status: "error",
        message: "Refresh token expirado ou inválido"
      });
    }
  }

  async #createUserRefreshToken(refreshToken: string, clientId: string): Promise<{
    status: string;
    message: string;
    response?: any;
    error?: string;
  }> {
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

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error("Erro ao salvar refresh token:", errorMessage);
      
      return {
        status: "error",
        message: "Erro ao criar o refresh token!",
        error: errorMessage,
      };
    }
  }
}