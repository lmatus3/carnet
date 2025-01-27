import { isAxiosError } from "axios";
import { ResponseInterface } from "../types/GeneralTypes";
import { eventoInterface, eventoPostInterface } from "../types/eventoType";
import { BackendApi } from "../api/config";

interface EventosBackend extends eventoInterface {
  // TODO Adaptar a datos con filtros
  prueba: string;
}

interface ResponseEventosDataInterface {
  message: string;
  data: { Eventos: EventosBackend[] } | null;
  errors: string[] | null;
}
interface ResponseEventoDataInterface {
  message: string;
  data: EventosBackend | null;
  errors: string[] | null;
}

interface ResponseEventos extends ResponseInterface {
  data?: ResponseEventosDataInterface;
}
interface ResponseEvento extends ResponseInterface {
  data?: ResponseEventoDataInterface;
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
export const GetEventos: () => Promise<ResponseEventos> = async () => {
  try {
    const response = await BackendApi.get("/evento");
    if (response.status) {
      return { ok: true, data: response.data as ResponseEventosDataInterface };
    } else {
      return { ok: false, error: "No se logró obtener los eventos" };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener los eventos",
    });
  }
};
// Obtener un evento específico
export const GetEvento: (id: string) => Promise<ResponseEvento> = async (
  id
) => {
  try {
    const response = await BackendApi.get("/evento/" + id);
    if (response.status) {
      return { ok: true, data: response.data as ResponseEventoDataInterface };
    } else {
      return { ok: false, error: "No se logró obtener el evento" };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró obtener el evento",
    });
  }
};

// Registrar un evento
export const PostEvento: (
  payload: eventoPostInterface
) => Promise<ResponseInterface> = async (payload) => {
  try {
    const response = await BackendApi.post("/evento", payload);
    if (response.status) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, error: "No se logró registrar el evento" };
    }
  } catch (error) {
    return ValidateError({
      err: error,
      errorMessage: "No se logró registrar el evento",
    });
  }
};
