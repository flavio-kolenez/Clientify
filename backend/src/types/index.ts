import { Document, Types } from 'mongoose';
import { Request } from 'express';

export interface IClient extends Document {
  clientType: "CPF" | "CNPJ";
  name: string;
  email: string;
  phone: string;
  document: string;
  address: IAddress;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAddress extends Document {
  postalCode: string;
  street: string;
  city: string;
  state: string;
}

export interface IRefreshToken extends Document {
  token: string;
  client_id: string;
  created_at: Date;
  expires_at: Date;
  is_revoked: boolean;
  last_used: Date;
  createdAt: Date;
  updatedAt: Date;
  revoke(): Promise<IRefreshToken>;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export interface IAuthRequest {
  client_id: string;
  client_secret: string;
}

export interface IRefreshRequest {
  refreshToken: string;
}

// Express Request com dados de autenticação
export interface AuthenticatedRequest extends Request {
  client?: {
    id: string;
    client_id: string;
  };
}