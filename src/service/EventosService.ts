import { ResponseInterface } from "../types/GeneralTypes";
import { eventoInterface, eventoPatchInterface, eventoPostInterface } from "../types/eventoType";
import { BackendApi } from "../api/config";
import { ValidateError } from "./ValidateError";

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
  data: {
    Evento: EventosBackend;
  };
  errors: string[] | null;
}

interface ResponseEventos extends ResponseInterface {
  data?: ResponseEventosDataInterface;
}
interface ResponseEvento extends ResponseInterface {
  data?: ResponseEventoDataInterface;
}

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
      error: error,
      errorMessage: "No se logró obtener los eventos",
    });
  }
};
// Obtener un evento específico
export const GetEvento: (id: string) => Promise<ResponseEvento> = async (
  id
) => {
  try {
    const response = await BackendApi.get(
      "/evento/" + id + "?include[]=EventoGrupo&include[]=EventoPublicoObjetivo.PublicoObjetivo&include[]=EventoTipo"
    );
    if (response.status) {
      return { ok: true, data: response.data as ResponseEventoDataInterface };
    } else {
      return { ok: false, error: "No se logró obtener el evento" };
    }
  } catch (error) {
    return ValidateError({
      error: error,
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
      error: error,
      errorMessage: "No se logró registrar el evento",
    });
  }
};
// Actualizar un evento
export const PatchEvento: (
  payload: eventoPatchInterface,
  id: number | string
) => Promise<ResponseInterface> = async (payload, id) => {
  try {
    const response = await BackendApi.patch("/evento/" + id, payload);
    if (response.status) {
      return { ok: true, data: response.data };
    } else {
      return { ok: false, error: "No se logró actualizar el evento" };
    }
  } catch (error) {
    return ValidateError({
      error: error,
      errorMessage: "No se logró actualizar el evento",
    });
  }
};
