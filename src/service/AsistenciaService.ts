import { ResponseInterface } from "../types/GeneralTypes";
import { BackendApi } from "../api/config";
import {
  asistenciaInterface,
  asistenciasDBInterface,
} from "../types/asistenciaType";
import { ValidateError } from "./ValidateError";

interface ResponseAsistenciasDataInterface {
  message: string;
  data: { EventoAsistencias: asistenciasDBInterface[] };
  errors: string[] | null;
}

interface ResponseAsistencias extends ResponseInterface {
  data?: ResponseAsistenciasDataInterface;
}

// Obtener todas las asistencias de un evento
export const GetAsistencias: (
  eventoId: string
) => Promise<ResponseAsistencias> = async (eventoId) => {
  try {
    const response = await BackendApi.get(
      `/eventoAsistencia?include[]=Perfil&include[]=Evento.EventoTipo&eventoId[eq]=${eventoId}`
    );
    if (response.status) {
      return {
        ok: true,
        data: response.data as ResponseAsistenciasDataInterface,
      };
    } else {
      return { ok: false, error: "No se logró obtener las asistencias" };
    }
  } catch (error) {
    return ValidateError({
      error: error,
      errorMessage: "No se logró obtener las asistencias",
    });
  }
};
// Registrar una asistencia
export const PostAsistencia: (
  payload: asistenciaInterface
) => Promise<ResponseInterface> = async (payload) => {
  try {
    const response = await BackendApi.post("/eventoAsistencia", payload);
    if (response.status) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, error: "No se logró registrar la asistencia" };
    }
  } catch (error) {
    return ValidateError({
      error: error,
      errorMessage: "No se logró registrar la asistencia",
    });
  }
};
