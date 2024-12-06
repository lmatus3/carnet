import { isAxiosError } from "axios";
import { BackendApi } from "../api/config";

export const GetCarnetInfo = async (codigo: string) => {
  try {
    const respuesta = await BackendApi.get("/validate/" + codigo);
    return { ok: true, data: respuesta.data };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data.valid == false) {
        return { ok: false, error: "Carnet inválido" };
      }
      return { ok: false, error: "Error no controlador" };
    }
    return { ok: false, error: "Error no controlador" };
  }
};
