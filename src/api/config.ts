import axios from "axios";
const rutaBackend = import.meta.env.VITE_BACKEND_URL;
// Este componente tiene como objetivo configurar axios para tener la ruta del backend

export const BackendApi = axios.create({
  baseURL: rutaBackend,
});

// Interceptor para agregar el token a cada solicitud
BackendApi.interceptors.request.use(
  (config) => {
    // const token = sessionStorage.getItem("token"); // O la forma en que almacenes tu token
    const sessionData = sessionStorage.getItem("session-storage");
    if (sessionData) {
      const parsedData = JSON.parse(sessionData as string);
      const { token } = parsedData.state.currentUser;
      if (token) {
        config.headers["x-token"] = `${token}`;
      }
    }
    config.headers["Accept"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
