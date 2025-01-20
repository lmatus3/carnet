import axios from "axios";
import { envs } from "../plugins/envs";
// Este componente tiene como objetivo configurar axios para tener la ruta del backend

export const AuthApi = axios.create({
  baseURL: envs.BACKEND_AUTH,
});

// Interceptor para agregar el token a cada solicitud
AuthApi.interceptors.request.use(
  (config) => {
    // const token = sessionStorage.getItem("token"); // O la forma en que almacenes tu token
    const sessionData = sessionStorage.getItem("session-storage");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData as string);
      const { token } = parsedData.state;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    config.headers["Accept"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
