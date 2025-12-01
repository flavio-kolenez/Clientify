import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Interceptor para injetar o token salvo no localStorage em todas as requisições
api.interceptors.request.use((config) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
      // Remove tokens inválidos e redireciona para login
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessTokenExpires");
        window.location.href = '/login';
      } catch (e) {
        return Promise.reject(error);
      }
    }
  }
);