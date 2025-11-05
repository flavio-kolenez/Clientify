import { api } from "./api";

export async function validateCep(cep: string) {
  const cleanCep = cep.replace(/\D/g, ""); // remove caracteres não numéricos

  if (cleanCep.length !== 8) {
    return { error: true, message: "CEP inválido! Deve conter 8 dígitos numéricos." };
  }

  const res = await api.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

  if (res.data.erro) {
    return { error: true, message: "CEP não encontrado!" };
  }

  if (!res.data.cep || !res.data.logradouro) {
    return { error: true, message: "Dados de CEP incompletos ou inválidos." };
  }

  return res.data;  
};