import { isAxiosError } from "axios";
import { BackendApi } from "../api/config";

interface ValidateResponseInterface {
  estudianteCarne: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: string;
}

interface InfoEstudianteInterface {
  estudianteCarne: string;
  nombreEstudiante: string;
  periodoLectivo: string;
  carreraNombre: string;
  personaFoto: string;
  iAA: string;
  matriculado: "SI" | "NO";
  inscrito: "SI" | "NO";
  estado: string;
  email: string;
  cursoNombre: string;
}
interface BackendResponse {
  message: string;
  data: { infoEstudiante: InfoEstudianteInterface[] } | null;
  errors: string[] | null;
}

type Response = { ok: boolean; data?: unknown; error?: string };
export const GetEstudianteInfo: () => Promise<Response> = async () => {
  try {
    const respuesta = await BackendApi.get("/infoEstudiante");
    return { ok: true, data: respuesta.data as BackendResponse };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.data.valid == false) {
        return { ok: false, error: "Carnet inválido" };
      }
      return { ok: false, error: "Error no controlador" };
    }
    return { ok: false, error: "Error no controlado" };
  }
};

export const ValidateCarnet: (carnet: string) => Promise<Response> = async (
  carnet
) => {
  try {
    const respuesta = await BackendApi.get("/validate/" + carnet);
    return { ok: true, data: respuesta.data as BackendResponse };
  } catch (error) {
    if (isAxiosError(error)) {
      // La lógica de la validación vendrá diferente
      if (error.response?.data.valid == false) {
        return { ok: false, error: "Carnet inválido" };
      }
      return { ok: false, error: "Error no controlador" };
    }
    return { ok: false, error: "Error no controlado" };
  }
};
