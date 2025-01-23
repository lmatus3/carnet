import { isAxiosError } from "axios";
import { ResponseInterface } from "../types/GeneralTypes";
import { eventoInterface } from "../types/eventoType";
import { BackendApi } from "../api/config";

interface AsistenciaBackend extends eventoInterface {
  // TODO Adaptar a datos con filtros
  prueba: string;
}

interface ResponseAsistenciasDataInterface {
  message: string;
  data: { asistencias: AsistenciaBackend[] } | null;
  errors: string[] | null;
}
interface ResponseAsistenciaDataInterface {
  message: string;
  data: AsistenciaBackend | null;
  errors: string[] | null;
}

interface ResponseAsistencias extends ResponseInterface {
  data?: ResponseAsistenciasDataInterface;
}
interface ResponseAsistencia extends ResponseInterface {
  data?: ResponseAsistenciaDataInterface;
}

const ValidateError: ({
  err,
  errorMessage,
}: {
  err: unknown;
  errorMessage?: string;
}) => {
  ok: boolean;
  error: string;
  status?: number;
} = (err, errorMessage = "No se logró obtener los datos") => {
  console.log(err);
  if (isAxiosError(err)) {
    // Access to config, request, and response
    const { response } = err;
    if (response && response.data) {
      const { message }: { message: string } = response.data;
      return { ok: false, error: message, status: err.status };
    }
    return { ok: false, error: errorMessage };
  } else {
    // Error no de backend
    return { ok: false, error: errorMessage };
  }
};
// Obtener todos los eventos
export const GetAsistencias: () => Promise<ResponseAsistencias> = async () => {
  try {
    const response = await BackendApi.get("/eventoAsistencia");
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
      err: error,
      errorMessage: "No se logró obtener las asistencias",
    });
  }
};
// Obtener un evento específico
export const GetAsistencia: (
  id: string
) => Promise<ResponseAsistencia> = async (id) => {
  try {
    const response = await BackendApi.get("/eventoAsistencia/" + id);
    if (response.status) {
      return {
        ok: true,
        data: response.data as ResponseAsistenciaDataInterface,
      };
    } else {
      return { ok: false, error: "No se logró obtener la asistencia" };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener la asistencia",
    });
  }
};

// Registrar un evento
export const PostAsistencia: (
  payload: eventoInterface
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
      err: error,
      errorMessage: "No se logró registrar la asistencia",
    });
  }
};
