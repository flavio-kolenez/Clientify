import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para injetar o token salvo no localStorage em todas as requisições
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // localStorage pode não estar disponível em alguns ambientes; ignorar
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      // Remove token inválido e opcionalmente redireciona para login
      try {
        localStorage.removeItem("token");
      } catch (e) {}
    }
    return Promise.reject(error);
  }
);
